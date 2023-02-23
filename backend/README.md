
# Install 
Install the project dependencies in root directory:
<pre><code>
yarn install
</code></pre>

# Running offline
To run dynamodb and graphql on your local machine:
<pre><code>
yarn start
</code></pre>

Now you can access the graphql endpoint at http://localhost:3000/graphql

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
This project is a managed deployment on Amazon Web Services using AWS Cognito for User Authentication. Dynamodb for database storage. S3 for large/media file type storage. API gateway for managing access to available routes.
