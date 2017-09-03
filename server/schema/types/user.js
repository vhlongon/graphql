const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { getCompany } = require('../utils');

const createUserType = (companyGet = getCompany) =>
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
      company: {
        type: CompanyType, // eslint-disable-line no-use-before-define
        resolve({ companyId } /* , args */) {
          return companyGet(companyId);
        },
      },
    }),
  });

module.exports = {
  UserType: createUserType(getCompany),
  createUserType,
};

const { CompanyType } = require('./company');
