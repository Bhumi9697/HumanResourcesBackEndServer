//import uuid from 'uuid/v1';
import * as db from './dynamo';
import accessControl from '../libs/accessControl';
import * as ActivityHelper from '../libs/ActivityHelper';

const TableName = process.env.stage + '-DocumentAccess';

function createHash(args){
  let key = '';
  if(args.type == 'state'){
    if(args.state){
      key = 'state#' + args.state;
    }
  }
  if(args.type == 'city'){
    if(args.state && args.city){
      key = 'city#' + args.state + '#' + args.city;
    }
  }
  if(args.type == 'company'){
    if(args.companyId){
      key = 'company#' + args.companyId;
    }
  }

  if(key != ''){
    return key;
  }
  else{
    throw new Error('unable to create hash for document permission');
  }
}

export function getDocsByArgs(args){
  let key = createHash(args);
  const params = {
    TableName,
    KeyConditionExpression: 'hashKey = :hashkey',
    ExpressionAttributeValues: {
   ':hashkey':key
    }
  };
  console.log('calling dynamodb:',params);
  return db.query(params);
}

export function create(args) {
  let hash = createHash(args);
  if(args.type == 'company'){
    ActivityHelper.notifyCompanyDocumentAdded(args);
  }
  const params = {
    TableName,
    Item: {
      hashKey: hash,
      documentId: args.documentId,
      createdOn: Date.now(),
      type:args.type,
      city:args.city,
      state:args.state,
      companyId:args.companyId
    },
    ConditionExpression: 'attribute_not_exists(hashKey) and attribute_not_exists(documentId)'
  };
  console.log('calling dynamodb:',params);
  return db.createItem(params);
}

export function getPermissionsByDocument(args){
    const params = {
    TableName,
    IndexName:'documentId',
    ProjectionType:'ALL',

      KeyConditionExpression: "documentId = :docId",
      ExpressionAttributeValues: {
          ":docId": args.documentId
      },
      ProjectionExpression:"documentId, #lestate, city, companyId, #letype",
      ExpressionAttributeNames: {"#lestate":"state", "#letype":"type"},
    };
    return db.query(params);
}

export function scanPermissions() {
  accessControl.adminOnly();
  const params = {
    TableName,
  };

  return db.scan(params);
}


export function deleteDocumentPermission(args) {
  accessControl.sameCompanyOrAdmin(args);
  let hash = createHash(args);
  const params = {
    TableName,
    Key: {
      hashKey: hash,
      documentId: args.documentId
    },
  };

  return db.deleteItem(params, args);
}
