import * as db from './dynamo.js';

const TableName = process.env.stage + '-DocumentCategory';


export function getMyDocumentCategories(args){
  const params = {
    TableName,
    KeyConditionExpression: 'companyId = :companyId',
    ExpressionAttributeValues: {
   ':companyId':args.companyId
    }
  };
  console.log('calling dynamodb:',params);
  return db.query(params);
}

export function createDocumentCategory(args) {
  const params = {
    TableName,
    Item: {
      companyId: args.companyId,
      categoryText: args.categoryText
    },
    ConditionExpression: 'attribute_not_exists(categoryText) and attribute_not_exists(companyId)'
  };
  console.log('calling dynamodb:',params);
  return db.createItem(params);
}
