const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLID,
    },
  },
});

module.exports = UserType;
