import AWS from 'aws-sdk';
const USERPOOLID = process.env.IS_OFFLINE ? process.env.localUserPool : process.env.userPoolId;
const CLIENTID = process.env.IS_OFFLINE ? process.env.localPoolClient : process.env.userPoolClientId;


AWS.config.update({region:'us-east-1'});
global.fetch = require('node-fetch').default;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

export async function addUserToPool(userProps){
  var params = {
    UserPoolId: USERPOOLID, /* required */
    Username: userProps.userId, /* required */
    UserAttributes: [
      {
        Name: 'name', /* required */
        Value: userProps.first || ""
      },
      {
        Name: 'family_name', /* required */
        Value: userProps.last || ""
      },
    /*  {
        Name: 'phone_number',
        Value: userProps.phone || ""
      }
      */

    ],

    DesiredDeliveryMediums: [
      'EMAIL',
      /* more items */
    ],
    ForceAliasCreation: false,
    //TemporaryPassword: false,
  };
  const cognito = new AWS.CognitoIdentityServiceProvider();
  console.log('adding user to pool:',params);

  let result = new Promise( (resolve,reject) => {
    cognito.adminCreateUser(params,
      (err,results) => {
        if(err){
          reject(err);
        }
        else{
          resolve(results);
        }
      });
    });
  return result;
}

export async function disableUser(userProps){
  var params = {
    UserPoolId: USERPOOLID, /* required */
    Username: userProps.userId
  };
  const cognito = new AWS.CognitoIdentityServiceProvider();
  console.log('disabling',params);

  let result = new Promise( (resolve,reject) => {
    cognito.adminDisableUser(params,
      (err,results) => {
        if(err){
          reject(err);
        }
        else{
          resolve(results);
        }
      });
    });
  return result;
}

export async function enableUser(userProps){
  var params = {
    UserPoolId: USERPOOLID, /* required */
    Username: userProps.userId
  };
  const cognito = new AWS.CognitoIdentityServiceProvider();
  console.log('enabling',params);

  let result = new Promise( (resolve,reject) => {
    cognito.adminEnableUser(params,
      (err,results) => {
        if(err){
          reject(err);
        }
        else{
          resolve(results);
        }
      });
    });
  return result;
}

export async function userSignUp(userProps){

  var poolData = {
    UserPoolId: USERPOOLID, // Your user pool id here
    ClientId: CLIENTID, // Your client id here
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var cognitoAttributes = [];
  var attributeList = [
    { Name: 'family_name',Value: userProps.first },
    { Name: 'name',Value: userProps.last },
  ];

  attributeList.map(att => {
    cognitoAttributes.push(new AmazonCognitoIdentity.CognitoUserAttribute(att));
  });

  let result = new Promise( (resolve,reject) => {
    userPool.signUp(userProps.email, userProps.password, cognitoAttributes,null,
      (err,results) => {
        if(err){
          reject(err);
        }
        else{
          resolve(results);
        }
      });
    });
  return result;
}
