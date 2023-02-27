import * as dbActivityLog from '../../dynamo/ActivityLog.js';

export default {
  Query: {
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
