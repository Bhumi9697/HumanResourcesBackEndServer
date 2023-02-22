
import { mergeResolvers } from 'merge-graphql-schemas';
import UserResolver from './user';
import CompanyResolver from './Company';
import DocumentResolver from './Document';
import EmployeeDocuments from './EmployeeDocuments';
import EnumResolver from './Enums';
import ActivityLog from './ActivityLog';
const resolvers = [
  UserResolver,
  CompanyResolver,
  DocumentResolver,
  EmployeeDocuments,
  EnumResolver,
  ActivityLog
];

export default mergeResolvers(resolvers);
