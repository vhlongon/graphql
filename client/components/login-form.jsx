import React from 'react';
import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose';
import { css } from 'emotion';
import { graphql } from 'react-apollo';
import AuthForm from './auth-form';
import loginMutation from '../mutations/login';
import currentUserQuery from '../queries/current-user';

const getErrorMessages = error => error.message;

const formContainerStyle = css`
  position: relative;
  max-width: 100%;
  width: 500px;
  display: flex;
  justify-content: center;
`;

const closeButtonStyle = css`
position: relative;
z-index: 2;
`;

const LoginForm = ({ mutate, setError, error, resetError }) =>
  <div className={formContainerStyle}>
    {error &&
      <button className={closeButtonStyle} onClick={resetError}>
        close error
      </button>}
    <AuthForm
      title="Login Form"
      error={error}
      onSubmit={({ email, password }) => {
        mutate({
          variables: { email, password },
          refetchQueries: [{ query: currentUserQuery }],
        }).catch(({ graphQLErrors }) =>
          setError(graphQLErrors.map(getErrorMessages)),
        );
      }}
    />
  </div>;

export default compose(
  graphql(loginMutation),
  graphql(currentUserQuery),
  withStateHandlers(({ error = null }) => ({ error }), {
    setError: () => error => ({ error }),
  }),
  withHandlers({
    resetError: ({ setError }) => () => {
      setError(null);
    },
  }),
  // in order to avoid race conditions when decide to redirect the user to
  // dashboard route when case they are authenticated we need to use this lifecycle method
  // since we have hooked the component with the currentUser query everytime that the query is run
  // all components associated with it will rerender.
  // we couldnt simply do that using .then on the mutating because we would be redirect back and forth
  // from dashboard and login form ( because of how Apollo resolves the queries and mutations)
  lifecycle({
    componentWillUpdate(nextProps) {
      const { history, data: { user } } = this.props;
      if (!user && nextProps.data.user) {
        history.push('/dashboard');
      }
    },
  }),
)(LoginForm);
