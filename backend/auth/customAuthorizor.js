//Custom Lambda Handler for authorizing s3 operations
//'use strict';

import jwk from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import request from 'request';

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI
// console.log('process',process.env);
const iss = process.env.IS_OFFLINE
  ? 'https://cognito-idp.us-east-1.amazonaws.com/'
  : 'https://cognito-idp.' + process.env.region + '.amazonaws.com/' + process.env.userPoolId;

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
const authorize = (event, context, cb) => {
  console.log('Auth function invoked');
  if (event.authorizationToken) {
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log('statusCode:',response.statusCode);
          console.log('Request error:', error);
          cb('Unauthorized');
        }
        const keys = body;
        // Based on the JSON of `jwks` create a Pem:
        const k = keys.keys[0];
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        };
        const pem = jwkToPem(jwkArray);

        // Verify the token:
        jwk.verify(token, pem, { issuer: iss }, (err, decoded) => {
          if (err) {
            console.log('Unauthorized user:', err.message);
            cb('Unauthorized');
          } else {
            cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
          }
        });
      });
  } else {
    console.log('No authorizationToken found in the header.');
    cb('Unauthorized');
  }
};

const authorizeToken = (token) => {
  return new Promise((resolve, reject) => {
    console.log('Auth function invoked');
  //  if (event.authorizationToken) {
      // Remove 'bearer ' from token:
      //if(token.indexOf('bearer'))
      //const token = token
      // Make a request to the iss + .well-known/jwks.json URL:
      request(
        { url: `${iss}/.well-known/jwks.json`, json: true },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            console.log('Request error, Custom Authorizer:', error);

            console.log('statusCode:',response.statusCode);
            console.log('Request error:', error);
//            console.log('Body', body);
            reject(error);
            return;
          }
          const keys = body;
          // Based on the JSON of `jwks` create a Pem:
          const k = keys.keys[0];
          const jwkArray = {
            kty: k.kty,
            n: k.n,
            e: k.e,
          };
          const pem = jwkToPem(jwkArray);

          // Verify the token:
          jwk.verify(token, pem, { issuer: iss },(err,result) => {
            if (err) {
              console.log('Unauthorized:', err.message);
              reject(err.message);
            }
            else {
                 console.log('authorized!');
                 resolve(result);
            }

          });

        }
      );
    });
};

export { authorize, authorizeToken};
