const { GraphQLSchema } = require('graphql');
const { RootQuery } = require('./root-query');
const { mutations } = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});
