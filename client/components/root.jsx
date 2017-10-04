import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { gql } from '../../config';
import App from './app';
import Header from './header';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import Dashboard from './dashboard';

const networkInterface = createNetworkInterface({
  // this takes every piece of data and runs through this function,
  // so this is used to identify the pieces of data inside the apollo store
  // in this case we use the id property as the identifier for that piece of data
  // so apollo knows and communicates back when it has been updated somehow
  // make sure we request back the id field for each query/mutation
  uri: `${gql.root}:${gql.port}${gql.path}`,
  // sending this option tells to Apollo client that is safe to send cookies when
  // sending requests because it is specified that they come from the same place
  opts: {
    credentials: 'include',
  },
});

const client = new AppolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

const renderDashBoard = onStatusUpdated => props =>
  <Dashboard {...props} onStatusUpdated={onStatusUpdated} />;

const onStatusUpdated = status =>
  console.log(
    `%c Auth Status: ${status}`,
    'background: white; color: blue; padding: 2px;',
  );

const Root = () =>
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route
            path="/dashboard"
            component={renderDashBoard(onStatusUpdated)}
          />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>;

export default Root;
