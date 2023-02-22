export default `
  type ActivityLog {
    companyId: ID!
    userActivityId: String!
    userId: String
    activityId: String!
    notify: Boolean
    type: String
    link: String
    timestamp: Float
    action: String
    textBody: String
  }

  type Query {
    listActivities: [ActivityLog]
    activitiesByCompany(companyId:String!): [ActivityLog]
    activitiesByUser(userId:String, companyId:String!): [ActivityLog]
    getMyActivities: [ActivityLog]
  }
  `
;
