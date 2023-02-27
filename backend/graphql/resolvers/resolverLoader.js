
import { mergeResolvers } from 'merge-graphql-schemas';
import UserResolver from './user.js';
import CompanyResolver from './Company.js';
import EnumResolver from './Enums.js';
import ActivityLog from './ActivityLog.js';
const resolvers = [
  UserResolver,
  CompanyResolver,
  EnumResolver,
  ActivityLog
];

export default mergeResolvers(resolvers);
