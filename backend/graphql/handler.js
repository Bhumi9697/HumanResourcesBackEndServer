import { ApolloServer } from "apollo-server-lambda";
import schema from "./types/typeLoader.js";
import resolvers from "./resolvers/resolverLoader.js";
import * as userIdDb from "../dynamo/UserIdentity.js";
import { createComplexityLimitRule } from "graphql-validation-complexity";
import gql from "graphql-tag";
import accessControl from "../libs/accessControl.js";

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: ({ event, context }) => ({
    user: context.user,
  }),
  formatError: (error) => {
    return error;
  },
  formatResponse: (response) => {
    return response;
  },
  playground: true,
  validationRules: [createComplexityLimitRule(10000)],
  tracing: false,
});

async function authenticate(AuthorizationHeader) {
  let token = await authorizeToken(AuthorizationHeader);
  if (token != "Unauthorized") {
    let user = await userIdDb.getUserById(token.email).then((result, err) => {
      if (err) {
        console.log("error!", err);
      }
      return result;
    });
    return user;
  }
  return token;
}

////////////////////////////////////////////////////////////////
//
// GraphQL handler
//
////////////////////////////////////////////////////////////////
export const graphqlHandler = (event, context, callback) => {

  if (event.headers && event.headers.Authorization) {
    //authenticate(event.headers.Authorization)
    //  .then((result) => {
    //    if (result != "Unauthorized") {
    //      context.user = result || 0;
    //      accessControl.setUser(context.user);
    //      console.log("creating authenticated server handler...");
    //      server.createHandler({
    //        cors: {
    //          origin: "*",
    //          credentials: true,
    //        },
    //      })(event, context, callback);
    //    } else {
    //      context.user = "must authenticate";
    //    }
    //  })
    //  .catch((err) => {
    //    console.log("err:", err);
    //    let response = {
    //      statusCode: 403,

    //      body: JSON.stringify({
    //        data: null,
    //        errors: [{ message: err }],
    //      }),
    //      isBase64Encoded: false,
    //    };
    //    callback(null, response);
    //  });
  } else {
    const ignoreAuthentication = true;
    if (ignoreAuthentication || process.env.IS_OFFLINE) {
      server.createHandler({
        cors: {
          origin: "*",
          credentials: true,
        },
      })(event, context, callback);
    } else {
      let response = {
        statusCode: 403,

        body: JSON.stringify({
          data: null,
          errors: [{ message: "Unauthorized" }],
        }),
        isBase64Encoded: false,
      };
      callback(null, response);
    }
  }
};
