import * as db from './dynamo.js';
import accessControl from '../libs/accessControl.js';

const TableName = 'User';

export function getUser(userId, companyId) {
  accessControl.canViewUser({companyId,userId});
  const params = {
    TableName,
    Key:{
      userId: userId,
      companyId: companyId
    }
  };

  return db.get(params);
}

export function listUsers() {
  accessControl.adminOnly();
  const params = {
    TableName,
  };

  return db.scan(params);
}

export function getCompanyAdmins(companyId){
  accessControl.companyAdmin(companyId);
  const params = {
    TableName,
    FilterExpression: "userRole = :owner OR userRole = hr",
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId': companyId,
   ':owner': 'owner',
    }
  };
  return db.query(params);
}

export function getUsersByCompany(companyId){
  accessControl.companyAdmin(companyId);
  const params = {
    TableName,
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId': companyId
    }
  };
  return db.query(params);
}

export function getUserByEmployeeId(args){
  const params = {
    TableName,
    FilterExpression: 'employeeId = :employeeId',
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId': args.companyId,
   ':employeeId': args.employeeId
    }
  };
  return db.query(params);
}

export function create(args) {
  const params = {
    TableName,
    Item: {
      ...args,
      createdOn: Date.now()
    },
    ConditionExpression: 'attribute_not_exists(companyId) and attribute_not_exists(userId)'
  };

  return db.createItem(params);
}

export function updateUser(args) {
  const params = {
    TableName,
    Key:{
      userId: args.companyId,
      companyId: args.userId
    },
    ConditionExpression:'userId = :userId and companyId = :companyId', //Only update item if exists.
    ExpressionAttributeValues: {':userId':args.userId, ':companyId':args.companyId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  let updateArgs = {...args};
  delete updateArgs.companyId;
  delete updateArgs.userId;
  if(Object.keys(updateArgs).length == 0){
    throw new Error("nothing to update");
  }

  db.formatUpdate(params,updateArgs);
  return db.updateItem(params, args);
}

export function deleteUser(userProps) {
  const params = {
    TableName,
    Key: {
      userId: userProps.userId,
      companyId: userProps.companyId
    },
  };
  return db.deleteItem(params, userProps);
}
