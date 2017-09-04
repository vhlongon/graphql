const { GraphQLSchema } = require('graphql');
const mutation = require('./mutation');
const { RootQuery } = require('./root-query');

const schema = {
  query: RootQuery,
  mutation,
};

module.exports = {
  schema: new GraphQLSchema(schema),
};
