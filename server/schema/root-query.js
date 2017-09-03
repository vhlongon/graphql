const { GraphQLObjectType, GraphQLString } = require('graphql');
const { UserType } = require('./types/user');
const { CompanyType } = require('./types/company');
const { getCompany, getUser } = require('./utils');

const createRootQuery = (userGet = getUser, companyGet = getCompany) =>
  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLString } },
        resolve(parentValue, { id }) {
          return userGet(id);
        },
      },
      company: {
        type: CompanyType,
        args: { id: { type: GraphQLString } },
        resolve(parentValue, { id }) {
          return companyGet(id);
        },
      },
    },
  });

module.exports = {
  RootQuery: createRootQuery(getUser, getCompany),
  createRootQuery,
};
