const { GraphQLObjectType, GraphQLString } = require('graphql');

const authService = require('../services/auth');
const UserType = require('./types/user-type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, args, req /* also called 'context' */) {
        const { email, password } = args;
        // the signup service signup returns a promise, so make sure to return it ,
        // so graphql knows to wait and handle it
        return authService.signup({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // this is returned from passport in the section,
        // make sure to save a reference to the current user
        // before attempting to log out, to be able to return the user
        // from this mutation
        const { user } = req;
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, args, req /* also called 'context' */) {
        const { email, password } = args;
        // the signup service signup returns a promise, so make sure to return it ,
        // so graphql knows to wait and handle it
        return authService.login({ email, password, req });
      },
    },
  },
});

module.exports = mutation;
