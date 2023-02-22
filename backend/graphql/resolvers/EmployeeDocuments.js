//import * as dbUsers from '../../dynamo/users';
import uuid from 'uuid/v1';
//import { AuthenticationError } from 'apollo-server-lambda';
import * as dbEmployeeDocuments from '../../dynamo/EmployeeDocuments';
import * as dbDocumentCategories from '../../dynamo/DocumentCategories';
import * as employeeFileHandler from '../../libs/employeeFileHandler.js';
import accessControl from '../../libs/accessControl';
import * as ActivityHelper from '../../libs/ActivityHelper';

//DB Methods:
//listDocuments()
//listByCompany(args)
//listByUser(args)
//getDocument(args)
//create(args)
//update(args)
//deleteDocument(args)

// Graph QL Resolvers:
// createEmployeeDocument
// uploadEmployeeFile
// updateEmployeeDocument
// deleteEmployeeDocumen t
// getEmployeeDocument
// employeeDocsByUser
// employeeDocsByCompany
// listEmployeeDocuments

function addUpdatedBy(args,context){
  args.updatedBy = {
    userId:context.user.userId,
    companyId: context.user.companyId,
    first: context.user.first,
    last: context.user.last
  };
}

export default {
  Mutation: {
    createEmployeeDocument: (_,args,context) => {
      accessControl.employeeOrCompanyAdmin(args);
      addUpdatedBy(args,context);
      args.documentId = uuid();

    return dbEmployeeDocuments.create(args).then(documentResults => {
          console.log('documentResults',documentResults);
          return documentResults;
      });
    },
    uploadEmployeeFile: (_,args,context) => {
      addUpdatedBy(args,context);
      ActivityHelper.notifyCompanyDocumentAdded(args);
      return employeeFileHandler.uploadEmployeeDocument(args,context);
    },
    uploadEmployeeFileUppy: (_,args,context) => {
      addUpdatedBy(args,context);
      ActivityHelper.notifyCompanyDocumentAdded(args);
      return employeeFileHandler.uploadEmployeeDocumentUppy(args,context);
    },
    updateEmployeeDocument: (_,args,context) => {
      addUpdatedBy(args,context);
      return dbEmployeeDocuments.update(args);
    },

    deleteEmployeeDocument: (_,args) => {
      ActivityHelper.logDocumentDeleted(args);
      return dbEmployeeDocuments.deleteDocument(args);
    },
    createDocumentCategory: (_,args) => dbDocumentCategories.createDocumentCategory(args),
  },
  Query: {
    listEmployeeDocuments: (_,args,context) => {
      const { user } = context;
      console.log('list employee docs user:',user);
      if(args.userId){
        dbEmployeeDocuments.listByUser(args,user);
      }
      if(args.companyId){
        return dbEmployeeDocuments.listByCompany(args,user);
      }
      return dbEmployeeDocuments.listDocuments(user);
    },
    getEmployeeDocument: (_,args) => dbEmployeeDocuments.getDocument(args),
    employeeDocsByUser : (_,args) => dbEmployeeDocuments.listByUser(args),
    employeeDocsByCompany : (_,args) => dbEmployeeDocuments.listByCompany(args),
    getDocumentCategories: (_,args) => dbDocumentCategories.getDocumentCategories(args),
    //getDocumentUrl: (_,args) => fileHandler.getCavnessDocument(args),

  },
  EmployeeDocument:{
    documentUrl:(_,args,context) => employeeFileHandler.getEmployeeDocument(_)
  }
};
