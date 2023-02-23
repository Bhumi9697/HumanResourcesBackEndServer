import uuid from 'uuid/v1.js';
import * as db from './dynamo.js';
import accessControl from '../libs/accessControl.js';

const TableName = 'Company';

export function listCompanies() {
  accessControl.adminOnly();
  const params = {
    TableName,
  };

  return db.scan(params);
}

export function getCompanyByName(args) {
  const params = {
    TableName,
    FilterExpression:'companyName =:companyName',
    ExpressionAttributeValues:{
      ':companyName':args.companyName
    }
  };

  return db.scan(params);
}

export function getCompany(companyId) {
  accessControl.sameCompanyOrAdmin({companyId});
  const params = {
    TableName,
    Key: {
      companyId
    }
  };
  return db.get(params, (err, data) => {
    if(err) {
      console.log('Get Company ERROR', err);
    } else {
      return data;
    }
  });
}

export function create(args) {
  const params = {
    TableName,
    Item: {
      companyId: args.companyId || uuid(),
      createdOn: Date.now(),
      ...args
    },
    ConditionExpression: 'attribute_not_exists(companyId)'
  };

  return db.createItem(params);
}

export function update(args) {
  accessControl.sameCompanyOrAdmin(args);
  const params = {
    TableName,
    Key: {
      companyId: args.companyId,
    },
    ConditionExpression:'companyId = :companyId', //Only update item if exists.
    ExpressionAttributeValues: {':companyId':args.companyId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  let updateArgs = {...args, createdOn: Date.now() };
  delete updateArgs.companyId;
  if(Object.keys(updateArgs).length == 0){
    throw new Error("nothing to update");
  }
  db.formatUpdate(params,updateArgs);
  return db.updateItem(params, args);
}

export function deleteCompany(args) {
  accessControl.adminOnly();
  const params = {
    TableName,
    Key: {
      companyId: args.companyId,
    },
  };

  return db.deleteItem(params, args);
}
