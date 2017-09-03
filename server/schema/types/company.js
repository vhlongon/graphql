const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const { getUsersfromCompany } = require('../utils');

const createCompanyType = (usersfromCompanyGet = getUsersfromCompany) =>
  new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      users: {
        type: new GraphQLList(UserType), // eslint-disable-line no-use-before-define
        resolve(parentValue /* , args */) {
          return usersfromCompanyGet(parentValue.id);
        },
      },
    }),
  });

module.exports = {
  CompanyType: createCompanyType(),
  createCompanyType,
};

const { UserType } = require('./user');
