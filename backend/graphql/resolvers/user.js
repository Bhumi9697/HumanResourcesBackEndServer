import {AuthenticationError, UserInputError } from 'apollo-server-lambda';
import uuid from 'uuid/v1.js';
import * as dbUsers from '../../dynamo/Users.js';
import * as dbUserIdentity from '../../dynamo/UserIdentity.js';
//import * as dbUserDocuments from '../../dynamo/UserDocuments';
import * as dbCompanyLocations from '../../dynamo/CompanyLocation.js';
import * as dbCompanies from '../../dynamo/Companies.js';
import * as userPool from '../../auth/adminUserPool.js';
import * as fileHandler from '../../libs/fileHandler.js';
import * as ActivityHelper from '../../libs/ActivityHelper.js';
import accessControl from '../../libs/accessControl.js';

export default {
  Query: {
    me: (_,args,context) => {
      console.log('Query Me context',context);
      if(!context.user){
        throw new AuthenticationError('unauthorized');
        return;
      }
      return dbUsers.getUser(context.user.userId,context.user.companyId);
    },
    companyUsers: (_,args,context) => dbUsers.getUsersByCompany(args.companyId),
    getUser: (_,args,context) =>  dbUsers.getUser(args.userId,args.companyId),
    listUsers: (_,args,context) =>  dbUsers.listUsers(),
  },
  User:{
    company: (_,args,context) => dbCompanies.getCompany(_.companyId),
    profilePhotoUrl: (_,args,context) => {
      if(_.profilePhoto){
        return fileHandler.getProfilePicture(_);
      }
      else {
        return null;
      }
    }
  },

  Mutation: {
    createUser: async (_, args, context) => {
      accessControl.canCreateUser(args);
      let userId = args.email.toLowerCase();
      let user;

      try{
        user = await dbUserIdentity.getUserById(userId);
      }
      catch(e){
        console.log(e);
      }

      if(user){
        console.log('user already exists:');
        throw new UserInputError("User with that email already exists");
      }

      // if(args.employeeId){
      //   console.log('user with that employeeid exists:');
      //   let employeeId = await dbUsers.getUserByEmployeeId(args);
      //   if(employeeId.length > 0){
      //     throw new UserInputError("User with that employeeId already exists");
      //   }
      // }

      let userArgs = {
        userId:userId,
        ...args
      };

      // ====================================================================
      // Don't really add to the cognito user pool:wa
      // await userPool.addUserToPool(userArgs).catch(
      //   (err) => {
      //     console.log('cognito err',err.message);
      //     throw new UserInputError(err.message);
      //   }
      // );

      if(['superadmin','accountmanager'].indexOf(args.userRole) != -1){
        args.companyId = 'cavness';
      }

      let identityArgs = {
         userId:userId,
         companyId:args.companyId,
         email:args.email,
         first:args.first,
         last:args.last,
         userRole:args.userRole
      };

      let promises = [];
      promises.push(dbUserIdentity.create(identityArgs));
      promises.push(dbUsers.create(userArgs));
      ActivityHelper.employeeAdded(userArgs);
      return Promise.all(promises).then(function(values) {
        console.log('all promises:',values);
         return values[1];
      });
    },

    registerCompanyAndOwner: async (_, args) => {
      let userId = args.email.toLowerCase();
      let user = await dbUserIdentity.getUserById(userId);
      if(user){
        throw new UserInputError("User with that email already exists");
      }

      let companies = await dbCompanies.getCompanyByName(args);
      if(companies.length > 0){
        throw new UserInputError("Company with that name already exists");
      }

      let companyId = uuid();
      let userArgs = {
        userId:userId,
         email:args.email,
         first:args.first,
         last:args.last,
         phone:args.phone,
         companyId:companyId,
         userRole:'owner',
         userStatus:'active',
         password: args.password
      };

      await userPool.userSignUp(userArgs).catch(
        (err) => {
          console.log('cognito err',err.message);
          throw new UserInputError(err.message);
        }
      );

      let identityArgs = {
         userId:userId,
         companyId:companyId,
         email:args.email,
         first:args.first,
         last:args.last,
         userRole:'owner'
      };

      let companyArgs = {
        companyOwnerId:userId,
        companyId:companyId,
        companySize:args.companySize,
        companyName:args.companyName,
        phone:args.phone,
        email: args.email,
        industry:args.industry,
        description: args.description,
        effectiveDate: args.effectiveDate,
        status: args.status || 'active'
      };

      let promises = [];
      promises.push(dbUserIdentity.create(identityArgs));
      delete userArgs.password;
      promises.push(dbUsers.create(userArgs));
      if(args.companyLocations && args.companyLocations.length > 0){
        let headquarters = {
          address1:args.companyLocations[0].address1,
          address2:args.companyLocations[0].address2,
          city:args.companyLocations[0].city,
          state:args.companyLocations[0].state
        };
        companyArgs = {...companyArgs,...headquarters};
        console.log('adding locations');

        args.companyLocations.map((location) => {
          location.companyId = companyId;
          console.log('locationObj',location);
          promises.push(dbCompanyLocations.create(location));
        });
      }
      promises.push(dbCompanies.create(companyArgs));

      return Promise.all(promises).then(function(values) {
        console.log('all promises:',values);
         return JSON.stringify(values);
      });
    },
    updateUser: async (_, args) => {

      if(args.employeeId){
        let employeeId = await dbUsers.getUserByEmployeeId(args);
        if(employeeId.length > 0 && employeeId[0].userId != args.userId){
          throw new UserInputError("User with that employeeId already exists");
        }
      }

      let promises = [];
      promises.push(dbUsers.updateUser({...args}));
      promises.push(dbUserIdentity.updateUserIdentity({...args}));
      if(args.userStatus){
        if(args.userStatus == 'inactive'){
          console.log('disabling user');
          promises.push(userPool.disableUser(args));
        }
        if(args.userStatus == 'active'){
          console.log('enabling user');
          promises.push(userPool.enableUser(args));
        }
      }
      return Promise.all(promises).then(function(values) {
        console.log('all promises:',values);
         return values[0];
      });
    },
    deleteUser: (_, args) => {
      dbUserIdentity.deleteUser(args);
      return dbUsers.deleteUser(args);
    }
  }
};
