import * as db from './dynamo.js';
import accessControl from '../libs/accessControl.js';
const TableName = 'DocumentTable';

export function listDocuments() {
  accessControl.adminOnly();
  const params = {
    TableName,
    Select:'ALL_ATTRIBUTES'
  };
  return db.scan(params);
}

export function listByType(args){
  const params = {
    TableName,
    KeyConditionExpression: 'documentType = :documentType',
    ExpressionAttributeValues: {
   ':documentType': args.documentType
    }
  };
  return db.query(params);
}

export function getDocument(args) {
  const params = {
    TableName,
    Key:{
      documentId: args.documentId,
      documentType: args.documentType
    }
  };

  return db.get(params);
}

export function getDocumentsByKeys(documentKeys) {
  if(documentKeys.length > 0){
    let requestItems = {};
    requestItems[TableName] = {
      Keys: documentKeys
    };
    const params = { RequestItems: requestItems };

    return db.batchGet(params).then(results => {
      return results[TableName];
    });
  }
  return [];
}

export function create(args) {
  accessControl.canCreateDoc(args);
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
  const params = {
    TableName,
    Key: {
      documentId: args.documentId,
      documentType: args.documentType
    },
    ConditionExpression:'documentId = :documentId', //Only update item if exists.
    ExpressionAttributeValues: {':documentId':args.documentId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  let updateArgs = {...args};
  delete updateArgs.documentId;
  delete updateArgs.documentType;
  if(Object.keys(updateArgs).length == 0){
    throw new Error("nothing to update");
  }

  db.formatUpdate(params,updateArgs);
  console.log('Update params ', params);
  return db.updateItem(params, updateArgs);
}

export function deleteDocument(args) {
  const params = {
    TableName,
    Key: {
      documentId: args.documentId,
      documentType: args.documentType
    },
  };

  return db.deleteItem(params, args);
}
