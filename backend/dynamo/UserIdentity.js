import * as db from './dynamo.js';

const TableName = process.env.stage + '-UserIdentity';

export function create(userProps) {
  //accessControl.canModifyUser(userProps);
  const params = {
    TableName,
    Item: {
      ...userProps,
      createdOn: Date.now()
    },
    ConditionExpression: 'attribute_not_exists(userId)'
  };
  return db.createItem(params);
}

export function getUserById(userId) {
  const params = {
    TableName,
    Key: {
      userId: userId,
    },
  };
  return db.get(params);
}

export function updateUserIdentity(args) {
  console.log('user props ', args);
  const params = {
    TableName,
    Key:{
      userId: args.userId,
    },
    ConditionExpression:'userId = :userId', //Only update item if exists.
    ExpressionAttributeValues: {':userId':args.userId},
    ExpressionAttributeNames: {},
    UpdateExpression: 'SET ',
    ReturnValues: 'ALL_NEW',
  };

  let updateArgs = {...args};
  delete updateArgs.userId;
  db.formatUpdate(params,updateArgs);
  console.log('UserIdentity params ', params);
  return db.updateItem(params, updateArgs);
}

export function deleteUser(userProps) {
  const params = {
    TableName,
    Key: {
      userId: userProps.userId,
    },
  };

  return db.deleteItem(params, userProps);
}
