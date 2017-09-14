import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { gql } from '../../config';
import App from './app';
import SongCreate from './song-create';

const client = new AppolloClient({
  networkInterface: createNetworkInterface({
    uri: `${gql.root}:${gql.port}${gql.path}`,
  }),
});

const Root = () =>
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/songs/new" component={SongCreate} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>;

export default Root;
