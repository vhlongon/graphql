const { GraphQLObjectType } = require('graphql');
const UserType = require('./user-type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // passport will pass the current authenticated user on the request object
        // if there is a authenticated user, otherwise it will return null
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
