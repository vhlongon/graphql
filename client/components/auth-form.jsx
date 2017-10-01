import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';

const AuthForm = ({
  email,
  password,
  updateEmail,
  updatePassword,
  title,
  onSubmit,
  handleSubmit,
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <h3>
      {title}
    </h3>
    <div>
      <label htmlFor="email">Email:</label>
      <input
        placeholder="email"
        value={email}
        name="email"
        onChange={updateEmail}
        type="email"
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        value={password}
        name="password"
        onChange={updatePassword}
        type="password"
      />
    </div>
    <div>
      <button>Submit</button>
    </div>
  </form>;

const enhance = compose(
  withStateHandlers(
    ({ email = '', password = '' }) => ({
      email,
      password,
    }),
    {
      updateEmail: () => ({ target }) => ({ email: target.value }),
      updatePassword: () => ({ target }) => ({ password: target.value }),
    },
  ),
  withHandlers({
    handleSubmit: ({ email, password }) => onSubmit => e => {
      e.preventDefault();
      onSubmit({ email, password });
    },
  }),
);

export default enhance(AuthForm);
