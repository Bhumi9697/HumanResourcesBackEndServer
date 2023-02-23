import uuid from 'uuid/v1.js';
import * as db from './dynamo.js';
import accessControl from '../libs/accessControl.js';

const TableName = 'CompanyLocation';

export function getCompanyLocations(companyId){
  accessControl.sameCompanyOrAdmin({companyId});
  const params = {
    TableName,
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId': companyId
    }
  };
  return db.query(params);
}

export function create(args) {
  const params = {
    TableName,
    Item: {
      locationId: uuid(),
      ...args
    },
  };
  return db.createItem(params);
}

export function update(args) {
  accessControl.sameCompanyOrAdmin(args);
  const params = {
    TableName,
    Key: {
      locationId: args.locationId,
      companyId: args.companyId
    },
    ConditionExpression:'locationId = :locationId and companyId = :companyId', //Only update item if exists.
    ExpressionAttributeValues: {':locationId':args.locationId, ':companyId':args.companyId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };
  delete args.companyId;
  delete args.locationId;
  db.formatUpdate(params,args,['locationId','companyId']);
  return db.updateItem(params, args);
}

export function deleteCompanyLocation(args) {
  accessControl.sameCompanyOrAdmin(args);
  const params = {
    TableName,
    Key: {
      locationId: args.locationId,
      companyId: args.companyId
    },
  };

  return db.deleteItem(params, args);
}
