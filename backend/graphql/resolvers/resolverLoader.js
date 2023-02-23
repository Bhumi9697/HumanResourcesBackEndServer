
import { mergeResolvers } from 'merge-graphql-schemas';
import UserResolver from './user.js';
import CompanyResolver from './Company.js';
import DocumentResolver from './Document.js';
import EmployeeDocuments from './EmployeeDocuments.js';
import EnumResolver from './Enums.js';
import ActivityLog from './ActivityLog.js';
const resolvers = [
  UserResolver,
  CompanyResolver,
  DocumentResolver,
  EmployeeDocuments,
  EnumResolver,
  ActivityLog
];

export default mergeResolvers(resolvers);
