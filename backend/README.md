
# Environment steup

## Install pre-requisites

* NodeJS
* yarn
* Java

## Install dependencies
This project is a managed deployment on Amazon Web Services using AWS Cognito for User Authentication. Dynamodb for database storage. S3 for large/media file type storage. API gateway for managing access to available routes.

To install the project dependencies do the following in the backend directory:

```
yarn install
```

## Running the service
This project, uses a local instance of DynamoDB. Please make sure you have Java installed and in your path. Once you do, install the DynamoDB with:

```
yarn serverless dynamodb install
```

Now that the DB is installed, you can run the service with:
<pre><code>yarn start</code></pre>

If all went well, you'll see something like this:

```
Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * graphql: api-dev-graphql
           * customMessage: api-dev-customMessage
           * auth: api-dev-auth

   ┌───────────────────────────────────────────────────────────────────────────┐
   │                                                                           │
   │   ANY | http://localhost:3000/graphql                                     │
   │   POST | http://localhost:3000/2015-03-31/functions/graphql/invocations   │
   │                                                                           │
   └───────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```

Now you can access the graphql endpoint at http://localhost:3000/graphql. If you access the endpoint with a browser, you'll see a graphql client. You can also use any HTTP client, like Postman, to make HTTP requests to that endpoint.

# Examples

Here is a simple GraphQL query to retrieve the list of users:

```
{
    listUsers{
        userId
        email
        first
        last
    }
}
```

Here is a simple query to create a new user:

```
mutation {
  createUser(userRole:SUPERADMIN, companyId:"Company123", email: "you@company.123", first:"Jane", last:"John"){
    userId
    userRole
    state
    last
    first
  }
}

```

# Project Structure
<pre>
- auth/  
- dynamodb/
  - Table1.js
  - Table2.js
  - Table3.js
- graphql/
  - handler.js
  - types/
    - typeLoader.js
  - resolvers/
    - resolverLoader.js
- libs/
- resources/
- package.json
- serverless.yml
</pre>

## auth/
Contains (aws cognito)functions responsible for user account creation, authentication etc.

## dynamodb/
Contains functions for database operations. Create/update/delete.

## graphql/
Contains graphql Apollo server, schema, and resolvers

## libs/ 
Contains shared code/dependencies

## resources/
Contains servlerless .yml files for provisioning AWS resources.

## serverless.yml
Root serverless script, joins all resources files, deployment stages, and plugin dependencies.
