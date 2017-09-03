const { GraphQLSchema } = require('graphql');
const mutation = require('./mutation');
const { RootQuery } = require('./root-query');

const schema = {
  query: RootQuery,
  mutation,
};

const createSchema = obj => new GraphQLSchema(obj);

module.exports = {
  schema: createSchema(schema),
  createSchema,
};
