const { GraphQLSchema } = require('graphql');
const { RootQuery } = require('./root-query');
const mutations = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
});

const schema = {
  query: RootQuery,
  mutation: mutations,
};

module.exports = {
  schema: new GraphQLSchema(schema),
};
