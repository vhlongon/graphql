import React from 'react';
import { compose, withState } from 'recompose';
import { graphql } from 'react-apollo';
import AuthForm from './auth-form';
import withError from './with-error';
import loginMutation from '../mutations/login';
import currentUserQuery from '../queries/current-user';

const getErrorMessages = error => error.message;
const LoginForm = ({ mutate, setError }) => (
    <div>
      <AuthForm
        header="Login Form"
        onSubmit={({ email, password }) => {
          mutate({
            variables: { email, password },
            refetchQueries: [{ query: currentUserQuery }],
          }).catch(({ graphQLErrors }) =>
            setError(graphQLErrors.map(getErrorMessages)),
          );
        }}
      />
    </div>
  );

export default compose(
  graphql(loginMutation),
  withState('error', 'setError', null),
  withError(({ error }) => error),
)(LoginForm);
