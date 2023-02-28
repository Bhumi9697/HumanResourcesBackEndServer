import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = process.env.IS_OFFLINE ? new AWS.DynamoDB.DocumentClient({
    // Use the local instance of dynamo
    endpoint: 'http://localhost:8000',
    region: 'us-east-1',
    convertEmptyValues:true
}) :  new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true, region: 'us-east-1'});

export function formatUpdate(params,args){
  for (let propKey in args) {
      if(args[propKey] != null){
        params.ExpressionAttributeValues[`:${propKey}`] = args[propKey];
        params.ExpressionAttributeNames[`#${propKey}`] = `${propKey}`;
        params.UpdateExpression += `#${propKey} = :${propKey}, `;
      }
  };
  if(Object.keys(params.ExpressionAttributeNames).length == 0 ){
    delete params.ExpressionAttributeNames;
  }
  params.UpdateExpression = params.UpdateExpression.slice(0, -2);
  return params;
}

export function scan(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => {
        return resolve(data.Items);
      })
      .catch(err => reject(err)),
  );
}

export function query(params) {
  return new Promise((resolve, reject) => {
    return dynamoDb.query(params).promise()
      .then(data => {
        return resolve(data.Items);
      })
      .catch(err => reject(err));
    }
  );
}

export function get(params) {
  return new Promise((resolve, reject) =>

    dynamoDb.get(params).promise()
      .then(data => {
        return resolve(data.Item);
      })
      .catch(err => reject(err)),
  );
}

export function batchGet(params) {
  return new Promise((resolve, reject) =>

    dynamoDb.batchGet(params).promise()
      .then(data => {
        return resolve(data.Responses);
      })
      .catch(err => reject(err)),
  );
}

export function createItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(data => {
        return resolve(params.Item);
      })
      .catch(err => {
        if(err.message == "The conditional request failed"){
          err.message = "Item already exists";
        }
        reject(err);
        }
      ),
  );
}

export function updateItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb
      .update(params)
      .promise()
      .then(data => resolve(data.Attributes))
      .catch(err => {
        if(err.message == "The conditional request failed"){
          err.message = "Item not found";
        }
        reject(err);

      }),
  );
}

export function deleteItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}
