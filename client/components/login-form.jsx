import React from 'react';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { css } from 'emotion';
import { graphql } from 'react-apollo';
import AuthForm from './auth-form';
import loginMutation from '../mutations/login';
import currentUserQuery from '../queries/current-user';

const getErrorMessages = error => error.message;

const formContainerStyle = css`
  position: relative;
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
      header="Login Form"
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
  withStateHandlers(({ error = null }) => ({ error }), {
    setError: () => error => ({ error }),
  }),
  withHandlers({
    resetError: ({setError}) => () => { setError(null) },
  }),
)(LoginForm);
