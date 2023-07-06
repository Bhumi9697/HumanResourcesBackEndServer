import {AuthenticationError, UserInputError } from 'apollo-server-lambda';
import { v4 as uuid } from 'uuid';
import * as dbUsers from '../../dynamo/Users.js';
import * as dbUserIdentity from '../../dynamo/UserIdentity.js';
import * as dbCompanyLocations from '../../dynamo/CompanyLocation.js';
import * as dbCompanies from '../../dynamo/Companies.js';
import * as fileHandler from '../../libs/fileHandler.js';
import * as ActivityHelper from '../../libs/ActivityHelper.js';
import accessControl from '../../libs/accessControl.js';

export default {
  Query: {
    me: (_,args,context) => {
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
      } catch(e) {
        console.log(e);
      }

      if(user){
        console.log('user already exists:');
        throw new UserInputError("User with that email already exists");
      }

      let userArgs = {
        userId:userId,
        ...args
      };

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
      };

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
         return JSON.stringify(values);
      });
    },
  updateUser: async (_, args) => {
  if (args.employeeId) {
    let employeeId = await dbUsers.getUserByEmployeeId(args);
    if (employeeId.length > 0 && employeeId[0].userId !== args.userId) {
      throw new UserInputError("User with that employeeId already exists");
    }
  }

  let promises = [];
  promises.push(dbUsers.updateUser(args)); // Removed unnecessary spread operator
  promises.push(dbUserIdentity.updateUserIdentity(args)); // Removed unnecessary spread operator

  if (args.userStatus) {
    if (args.userStatus === 'inactive') {
      console.log('disabling user');
    }
    if (args.userStatus === 'active') {
      console.log('enabling user');
    }
  }

  return Promise.all(promises).then(function (values) {
    return values[0];
  });
},

    deleteUser: (_, args) => {
      dbUserIdentity.deleteUser(args);
      return dbUsers.deleteUser(args);
    }
  }
};
