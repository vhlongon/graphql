import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './app';

const client = new AppolloClient({});

const Root = () =>
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Link to="/banana">Go to Banana </Link>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            path="/banana"
            component={() => <div>I am super banana</div>}
          />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>;

export default Root;
