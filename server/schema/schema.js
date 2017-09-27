const { GraphQLSchema } = require('graphql');
const mutation = require('./mutations');
const RootQueryType = require('./types/root-query');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
