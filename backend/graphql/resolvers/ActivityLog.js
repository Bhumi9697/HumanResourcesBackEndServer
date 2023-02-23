//import * as dbUsers from '../../dynamo/users';
// import uuid from 'uuid/v1';
//import { AuthenticationError } from 'apollo-server-lambda';
import * as dbActivityLog from '../../dynamo/ActivityLog.js';
// import accessControl from '../../libs/accessControl';


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

export default {
  Query: {
    // getUserActivities: (_,args,context) => {
    // },
    // getCompanyActivities: (_,args) => dbEmployeeDocuments.getDocument(args),
    listActivities:(_,args) => {
      return dbActivityLog.listActivities();
    },
    activitiesByCompany:(_,args) => {
      return dbActivityLog.listByCompany(args);
    },
    activitiesByUser:(_,args) => {
      return dbActivityLog.listByUser(args);
    },
    getMyActivities:(_,args,context) => {
      return dbActivityLog.listByUser(context.user);
    }
  }
};
