//import uuid from 'uuid/v1';
import * as db from './dynamo.js';

const TableName = 'UserActivityTable';

import accessControl from '../libs/accessControl.js';

function addHash(args){
  let key = '';
  key = args.userId + '$' + args.activityId;
  args.userActivityId = key;
  return;
}

export function listActivities() {
  accessControl.adminOnly();
  const params = {
    TableName,
    Select:'ALL_ATTRIBUTES'
  };
  console.log('list events params:',params);
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
    FilterExpression: '#activity_type = :user',
    KeyConditionExpression: 'companyId = :pkey and begins_with(userActivityId, :userId)',
    ExpressionAttributeValues: {
   ':pkey': args.companyId,
   ':userId': args.userId,
   ':user': 'user',
    },
    ExpressionAttributeNames: {
      "#activity_type": "type"
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