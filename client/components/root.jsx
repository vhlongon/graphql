import React from 'react';
import AppolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './app';

const client = new AppolloClient({});

const Root = () =>
  <ApolloProvider client={client}>
    <App text="GraphQL app" />
  </ApolloProvider>;

export default Root;
