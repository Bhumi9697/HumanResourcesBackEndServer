import * as db from './dynamo.js';

const TableName = 'EmployeeDocuments';

import accessControl from '../libs/accessControl.js';

function addHash(args){
  let key = '';
  key = args.userId + '$' + args.documentId;
  args.userDocId = key;
  return;
}

//DB Methods:
//listDocuments()
//listByCompany(args)
//listByUser(args)
//getDocument(args)
//create(args)
//update(args)
//deleteDocument(args)

export function listDocuments() {
  accessControl.adminOnly();
  const params = {
    TableName,
    Select:'ALL_ATTRIBUTES'
  };
  console.log('list documents params:',params);
  return db.scan(params);
}

export function listByCompany(args){
  accessControl.sameCompanyOrAdmin(args);
  const params = {
    TableName,
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId': args.companyId
    }
  };
  return db.query(params);
}

export function listByUser(args){
  accessControl.employeeOrCompanyAdmin(args);
  const params = {
    TableName,
    KeyConditionExpression: 'companyId = :pkey and begins_with(userDocId, :userId)',
    ExpressionAttributeValues: {
   ':pkey': args.companyId,
   ':userId': args.userId
    }
  };
  return db.query(params);
}

export function getDocument(args) {
  accessControl.employeeOrCompanyAdmin(args);
  const params = {
    TableName,
    Key:{
      companyId: args.companyId,
      userDocId: args.userDocId
    }
  };

  return db.get(params);
}

export function create(args) {
  addHash(args);
  const params = {
    TableName,
    Item: {
      ...args,
      createdOn: Date.now()
    }
  };
  return db.createItem(params);
}


export function update(args) {
  accessControl.employeeOrCompanyAdmin(args);
  const params = {
    TableName,
    Key: {
      companyId: args.companyId,
      userDocId: args.userDocId
    },
    ConditionExpression:'userDocId = :userDocId', //Only update item if exists.
    ExpressionAttributeValues: {':userDocId':args.userDocId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  let updateArgs = {...args};
  delete updateArgs.companyId;
  delete updateArgs.userDocId;
  if(Object.keys(updateArgs).length == 0){
    throw new Error("nothing to update");
  }

//removing last comma and space
  db.formatUpdate(params,updateArgs);
  console.log('Update params ', params);
  return db.updateItem(params, updateArgs);
}

export function deleteDocument(args) {
  accessControl.employeeOrCompanyAdmin(args);
  const params = {
    TableName,
    Key: {
      companyId: args.companyId,
      userDocId: args.userDocId
    },
  };

  return db.deleteItem(params, args);
}
