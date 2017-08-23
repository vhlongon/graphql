const graphl = require('graphql');
const fetch = require('node-fetch');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphl;

const getUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8084/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const getUser = (args, prop, collection = getUsers()) =>
  collection.then(users =>
    users.reduce((acc, user) => (user[prop] === args[prop] ? user : acc), {})
  );

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
        return getUser(args, 'id');
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
