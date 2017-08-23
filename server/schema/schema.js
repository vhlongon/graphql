const graphl = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphl;

const users = [
  { id: '1', firstName: 'Martin', age: 33 },
  { id: '2', firstName: 'Louis', age: 20 }
];

const getUser = (collection, args) =>
  collection.reduce((acc, user) => (user.id === args.id ? user : acc), {});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return getUser(users, args);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
