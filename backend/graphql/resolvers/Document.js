//import * as dbUsers from '../../dynamo/users';
import uuid from 'uuid/v1';
import { AuthenticationError } from 'apollo-server-lambda';
import * as dbDocuments from '../../dynamo/CavnessDocuments';
import * as dbDocumentAccess from '../../dynamo/DocumentAccess';
import * as dbDocumentCategories from '../../dynamo/DocumentCategories';
import * as dbCompanyLocations from '../../dynamo/CompanyLocation';
import * as fileHandler from '../../libs/fileHandler.js';
import accessControl from '../../libs/accessControl';
import * as ActivityHelper from '../../libs/ActivityHelper';
export default {
  Mutation: {
    uploadProfilePicture: (_,args) => {
      accessControl.employeeOrCompanyAdmin(args);
      return fileHandler.uploadProfilePicture(args);
    },
    createAdminDocument: (_,args,context) => {
      accessControl.adminOnly();

      args.updatedBy = args.updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };
    let promises = [];
    let documentId = uuid();
    args.documentId = documentId;
    if(args.documentPermissions){
      let len = args.documentPermissions.length;
      for(let i = 0; i < len; i++){
        let newPermission = {
          documentId:documentId,
          ...args.documentPermissions[i]
        };
        promises.push(dbDocumentAccess.create(newPermission));
      }
      delete args.documentPermissions;
    }

    return dbDocuments.create(args).then(documentResults => {

        if(promises.length > 0){
          return Promise.all(promises).then( (values) => {
            console.log('all promises:',values);
             return documentResults;
          });
        }
        else{
          console.log('documentResults',documentResults);
          return documentResults;
        }
      });
    },
    createCompanyDocument: (_,args,context) => {
      accessControl.companyAdmin();
      args.companyId = context.user.companyId;
      //ActivityHelper.notifyCompanyDocumentAdded(args);
      args.updatedBy = args.updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };
      let promises = [];
      let documentId = uuid();
      args.documentId = documentId;
      args.documentType = "company";
      let newPermission = {
        documentId:documentId,
        companyId: context.user.companyId,
        type: args.documentType
      };
      promises.push(dbDocumentAccess.create(newPermission));
      if(args.newCategory != '' && args.newCategory != null){
        args.category = args.newCategory;
        let newCategory = {
          companyId: context.user.companyId,
          categoryText: args.newCategory
        };
        promises.push(dbDocumentCategories.createDocumentCategory(newCategory));
      }
      delete args.documentPermissions;

      return dbDocuments.create(args).then(documentResults => {
        if(promises.length > 0){
          return Promise.all(promises).then( (values) => {
            console.log('all promises:',values);
             return documentResults;
          });
        }
        else{
          console.log('documentResults',documentResults);
          return documentResults;
        }
      });
    },
    uploadFile: (_,args,context) => {
      args.updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };
      return fileHandler.uploadCavnessDocument(args,context);
    },
    uploadFileUppy: (_,args,context) => {
      args.updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };
      return fileHandler.uploadCavnessDocumentUppy(args,context);
    },
    createDocumentPermissions: (_,args) => {
      accessControl.adminOnly();
      args.documentPermissions.documentId = args.documentId;
      let len = args.documentPermissions.length;
      let promises = [];
      for(let i = 0; i < len; i++){
        args.documentPermissions[i].documentId = args.documentId;
        promises.push(dbDocumentAccess.create(args.documentPermissions[i]));
      }
      return Promise.all(promises).then( (values) => {
          console.log('all promises:',values);
         return values;
      });

    },

    deleteDocumentPermissions: (_,args) => {
      accessControl.adminOnly(args);
      args.documentPermissions.documentId = args.documentId;
      let len = args.documentPermissions.length;
      let promises = [];
      for(let i = 0; i < len; i++){
        args.documentPermissions[i].documentId = args.documentId;
        promises.push(dbDocumentAccess.deleteDocumentPermission(args.documentPermissions[i]));
      }
      return Promise.all(promises).then( (values) => {
          console.log('all promises:',values);
         return values;
      });

    },

    updateDocument: async (_,args,context) => {
      await accessControl.canEditDoc(args);
      args.updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };
      if(args.newCategory != '' && args.newCategory != null){
        args.category = args.newCategory;
        let newCategory = {
          companyId: context.user.companyId,
          categoryText: args.newCategory
        };
        dbDocumentCategories.createDocumentCategory(newCategory);
      }
      return dbDocuments.update(args);
    },

    deleteDocument: async (_,args) => {
      await accessControl.canEditDoc(args);
      let permissions = await dbDocumentAccess.getPermissionsByDocument(args);
      console.log('deleting permissions:',permissions);
      permissions.forEach( row => {
        dbDocumentAccess.deleteDocumentPermission(row);
        ActivityHelper.logDocumentDeleted(row);
      });
      return dbDocuments.deleteDocument(args);
    }

  },
  Query: {
    listDocuments: (_,args,context) => {
      if(args.documentType){
        return dbDocuments.listByType(args);
      }
      else {
        return dbDocuments.listDocuments();
      }
    },
    listDocumentPermissions: (_,args, context) => {
      return dbDocumentAccess.getPermissionsByDocument(args).then(results => {
        console.log('docuemnt permission results:',results);
        return results;
      });
    },
    scanPermissions: (_,args) => dbDocumentAccess.scanPermissions(args),
    getDocument: (_,args,context) => dbDocuments.getDocument(args),
    getMyDocumentCategories: (_,args,context) => dbDocumentCategories.getMyDocumentCategories(context.user),
    listMyDocuments: async (_,args,context) => {

      console.log('List my documents',context);
      if(!context.user){
        throw new AuthenticationError('unauthorized');
        return;
      }
      let companyId = context.user.companyId;
      let locations = await dbCompanyLocations.getCompanyLocations(companyId);
      console.log('locations:',locations);
      let promises = [];

      let states = [];
      locations.forEach((location) => {
          console.log('getting docs for location:',location);
          promises.push(dbDocumentAccess.getDocsByArgs({type:'city',...location}));
          if(states.indexOf(location.state) == -1){
            states.push(location.state);
          }
      });
      states.forEach((state) => {
          promises.push(dbDocumentAccess.getDocsByArgs({type:'state',state:state}));
      });

      promises.push(dbDocumentAccess.getDocsByArgs({type:'company',companyId:companyId}));
      console.log('access promises:',promises);
      return Promise.all(promises).then( (values) => {
        console.log('location and company Docs:',JSON.stringify(values));
        let keyArray = [];
          values.forEach((val) => {
            val.forEach((doc) => {
             keyArray.push({documentType:doc.type,documentId:doc.documentId});
           });
        });
        console.log('keys to fetch:',keyArray);
        let promises2 = [];
        promises2.push(dbDocuments.getDocumentsByKeys(keyArray));
        promises2.push(dbDocuments.listByType({documentType:'national'}));
        return Promise.all(promises2).then( (docs) => {
          console.log('batch results:',docs[0]);
          return [].concat.apply([], docs);
        });
      });
    },
  },
  Document:{
    documentUrl:(_,args) => fileHandler.getCavnessDocument(_),
    documentPermissions: (_,args) => dbDocumentAccess.getPermissionsByDocument(_)
  }
};
