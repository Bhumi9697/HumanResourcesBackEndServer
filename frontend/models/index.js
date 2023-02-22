// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Employee, Company, Document, Contractor } = initSchema(schema);

export {
  Employee,
  Company,
  Document,
  Contractor
};