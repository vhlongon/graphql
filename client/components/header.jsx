import React from 'react';
import { graphql } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import withLoader from './with-loader';
import withError from './with-error';
import currentUserQuery from '../queries/current-user';
import logoutMutation from '../mutations/logout';

const SignLoginButtons = () =>
  <li>
    <Link to="/signup">Signup</Link>
    <Link to="/login">Login</Link>
  </li>;

const Logout = ({ logout }) =>
  <li>
    <a role="presentation" onClick={logout}>
      Logout
    </a>
  </li>;

const Header = ({ data, logout }) =>
  <nav>
    <Link to="/">Home</Link>
    <ul>
      {data.user ? <Logout logout={logout} /> : <SignLoginButtons />}
    </ul>
  </nav>;

const enhance = compose(
  graphql(currentUserQuery),
  graphql(logoutMutation),
  withLoader(({ data }) => data && data.loading),
  withRouter,
  withHandlers({
    logout: ({ mutate, history }) => () => {
      // make sure to re-run the query to return current auth status
      // so the data in the header can be properly updated
      mutate({
        refetchQueries: [{ query: currentUserQuery }],
      }).then(() => {
        history.push('/');
      });
    },
  }),
  withError(({ error }) => error),
);

export default enhance(Header);