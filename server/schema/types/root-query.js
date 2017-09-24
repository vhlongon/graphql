const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  // TODO: update the fields object. Just added here so graphql doesn't throw when trying to start the server
  fields: () => ({
    user: {
      type: GraphQLID,
    },
  }),
});

module.exports = RootQueryType;
