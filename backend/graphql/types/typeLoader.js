// ./graphql/types/index.js
import { mergeTypes } from 'merge-graphql-schemas';

import User from './User.js';
import Company from './Company.js';
import CompanyLocation from './CompanyLocation.js';
import CavnessDocument from './CavnessDocument.js';
import DocumentCategory from './DocumentCategory.js';
import EmployeeDocument from './EmployeeDocument.js';
import EnumTypes from './EnumTypes.js';
import ActivityLog from './ActivityLog.js';

const types = [
  EnumTypes,
  User,
  Company,
  CompanyLocation,
  CavnessDocument,
  EmployeeDocument,
  DocumentCategory,
  ActivityLog
];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(types, { all: true });
