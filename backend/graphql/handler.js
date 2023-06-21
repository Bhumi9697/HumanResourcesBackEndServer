import { ApolloServer } from "apollo-server-lambda";
import schema from "./types/typeLoader.js";
import resolvers from "./resolvers/resolverLoader.js";
import { createComplexityLimitRule } from "graphql-validation-complexity";

////////////////////////////////////////////////////////////////
//
// Instance of Apollo Server
//
////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////
//
// GraphQL handler
//
////////////////////////////////////////////////////////////////
export const graphqlHandler = (event, context, callback) => {
    console.log("here we go")
    server.createHandler({
      cors: {
        origin: "*",
        credentials: true,
      },
    })(event, context, callback);
};
