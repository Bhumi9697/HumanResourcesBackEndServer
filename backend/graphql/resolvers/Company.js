import { v4 as uuid } from 'uuid';
import { UserInputError } from 'apollo-server-lambda';
import * as dbCompanies from '../../dynamo/Companies.js';
import * as dbUserIdentity from '../../dynamo/UserIdentity.js';
import * as dbUsers from '../../dynamo/Users.js';
import * as dbCompanyLocations from '../../dynamo/CompanyLocation.js';
import * as fileHandler from '../../libs/fileHandler.js';
import accessControl from '../../libs/accessControl.js';

export default {
  Query: {
    getCompany: (_, args, context)  => dbCompanies.getCompany(args.companyId),
    getCompanyLocations: (_, args, context)  => dbCompanyLocations.getCompanyLocations(args.companyId),
    listCompanies: (_, args, context) => dbCompanies.listCompanies(),
  },

  Mutation: {
    createCompanyAndOwner: async (_, args) => {
      let userId = args.email.toLowerCase();
      let companyId = uuid();

      let user = await dbUserIdentity.getUserById(userId);
      if(user){
        throw new UserInputError("User with that email already exists");
      }

      let companies = await dbCompanies.getCompanyByName(args);
      if(companies.length > 0){
        throw new UserInputError("Company with that name already exists");
      }

      let userArgs = {
        userId:userId,
         email:args.email,
         first:args.first,
         last:args.last,
         phone:args.phone,
         companyId:companyId,
         userRole:'owner'
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
        companyId:companyId,
        companyOwnerId: userId,
        companySize:args.companySize,
        companyName: args.companyName,
        industry: args.industry,
        description:args.description,
        status: args.status || 'active',
        effectiveDate: args.effectiveDate,
        email:args.email,
        phone:args.phone,

      };

      let promises = [];
      //Add company Location
      promises.push(dbCompanies.create(companyArgs));
      promises.push(dbUserIdentity.create(identityArgs));
      promises.push(dbUsers.create(userArgs));
      if(args.companyLocations && args.companyLocations.length > 0){
        let companyLocations = args.companyLocations;
        companyArgs = {
          address1:args.companyLocations[0].address1,
          address2:args.companyLocations[0].address2,
          city:args.companyLocations[0].city,
          state: companyLocations ? companyLocations.state : "",
          ...companyArgs
        };
        args.companyLocations.map((location) => {
          location.companyId = companyId;
          promises.push(dbCompanyLocations.create(location));
        });
      }
      return Promise.all(promises).then(function(values) {
         return values[0];
      });
    },
    createCompanyLocation: (_, args) => dbCompanyLocations.create(args),
    updateCompany: async (_, args) => {

        let company = await dbCompanies.getCompany(args.companyId);
        if(company){
          return dbCompanies.update(args);
        }
        else {
          throw new Error("Item not found");
        }
    },
    updateCompanyLocation: (_, args) => dbCompanyLocations.update(args),
    deleteCompanyLocation: (_, args) => dbCompanyLocations.deleteCompanyLocation(args),
    uploadCompanyLogo: (_, args, context) => {
      accessControl.sameCompanyOrAdmin(args);
      return fileHandler.uploadCompanyLogo(args);
    }
  },
  Company:{
    users: (_,args) => dbUsers.getUsersByCompany(_.companyId),
    companyLocations: (_,args,context) => {
      if(_.companyId){
        return dbCompanyLocations.getCompanyLocations(_.companyId);
      }
    },
    companyLogoUrl: (_,args,context) => {
      if(_.companyLogo){
        return fileHandler.getCompanyLogo(_);
      }
      return null;
    }
  },
};
