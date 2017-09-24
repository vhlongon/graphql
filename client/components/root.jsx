import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { gql } from '../../config';
import App from './app';

const client = new AppolloClient({
  networkInterface: createNetworkInterface({
    uri: `${gql.root}:${gql.port}${gql.path}`,
    // this takes every piece of data and runs through this function,
    // so this is used to identify the pieces of data inside the apollo store
    // in this case we use the id property as the identifier for that piece of data
    // so apollo knows and communicates back when it has been updated somehow
    // make sure we request back the id field for each query/mutation
    dataIdFromObject: o => o.id,
  }),
});

const Root = () =>
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>;

export default Root;
