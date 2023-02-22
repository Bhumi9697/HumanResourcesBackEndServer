import { ApolloServer } from 'apollo-server-lambda';
import  schema  from '../graphql/types/typeLoader.js';
import  resolvers  from '../graphql/resolvers/resolverLoader.js';
import accessControl from '../libs/accessControl'

const server = (context) => {
  accessControl.setUser(context.user)
  let apollo =  new ApolloServer({
    introspection:true,
    typeDefs: schema,
    resolvers,
    context: context,
    formatError: error => {
      console.log(error);
      return error;
    },
    formatResponse: response => {
      //console.log(response);
      return response;
    },
    playground: true,
    tracing: false,
  });
  return apollo;
};

module.exports.createServer = server;
