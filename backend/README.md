# cavness-serverless
Backend Mono-repo for deploying aws services.

# Setup
To run this project offline make sure serverless framework is installed:
<pre><code>
npm install -g serverless
</code></pre>

# install 
project dependencies in root directory:
<pre><code>
yarn install
</code></pre>

# Running offline
To run dynamodb and graphql on your local machine:
<pre><code>
sls offline start
</code></pre>
Now you can access the graphql endpoint at localhost:3000/graphql

# Running online
Configure your aws credentials with aws-cli (do not commit/add to github!!!)
then run:
<pre><code>
sls deploy
</code></pre>

# Project Structure
<pre>
-auth/  
-dynamodb/
  -Table1.js
  -Table2.js
  -Table3.js
-graphql/
  -handler.js
  -types/
    -typeLoader.js
  -resolvers/
    -resolverLoader.js
-libs/
-mocks/
-resources/
-scraps/
-tests/
-package.json
-serverless.yml
</pre>

# auth/
Contains (aws cognito)functions responsible for user account creation, authentication etc.

# dynamodb/
Contains functions for database operations. Create/update/delete.

# graphql/
Contains graphql Apollo server, schema, and resolvers

# libs/ 
Contains shared code/dependencies

# resources/
Contains servlerless .yml files for provisioning AWS resources.

# serverless.yml
Root serverless script, joins all resources files, deployment stages, and plugin dependencies.




# Project Dependencies
Brief description of what resources this project uses:

This project is a managed deployment on Amazon Web Services using AWS Cognito for User Authentication. Dynamodb for database storage. S3 for large/media file type storage. API gateway for managing access to available routes.
