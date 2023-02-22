// ./graphql/types/index.js
import { mergeTypes } from 'merge-graphql-schemas';

import User from './User';
import Company from './Company';
import CompanyLocation from './CompanyLocation';
import CavnessDocument from './CavnessDocument';
import DocumentCategory from './DocumentCategory';
import EmployeeDocument from './EmployeeDocument';
import EnumTypes from './EnumTypes';
import ActivityLog from './ActivityLog';

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
