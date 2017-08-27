const graphl = require('graphql');
const fetch = require('node-fetch');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphl;

const getData = async path => {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error);
  }
};

const getUser = id => getData(`http://localhost:8084/users/${id}`);
const getCompany = id => getData(`http://localhost:8084/companies/${id}`);
const getUsersfromCompany = id =>
  getData(`http://localhost:8084/companies/${id}/users`);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType, // eslint-disable-line no-use-before-define
      resolve(parentValue /* args */) {
        return getCompany(parentValue.companyId);
      }
    }
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue /* args */) {
        return getUsersfromCompany(parentValue.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return getUser(args.id);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return getCompany(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
