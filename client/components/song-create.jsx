import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const mutation = gql`
  mutation addSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = ({ title, updateTitle, onSubmit }) =>
  <div>
    <Link to="/">Back</Link>
    <h3>Create a new song</h3>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Song Title:</label>
        <input onChange={updateTitle} value={title} name="title" />
      </div>
      <input type="submit" value="hit me!" />
    </form>
  </div>;

const enhance = compose(
  graphql(mutation),
  withStateHandlers(
    ({ title = '' }) => ({
      title,
    }),
    {
      updateTitle: () => ({ target }) => ({
        title: target.value,
      }),
    }
  ),
  withHandlers({
    onSubmit: props => e => {
      const { title, mutate, history } = props;
      e.preventDefault();
      console.log('submitting form with title: ', title);
      mutate({
        variables: {
          title,
        },
        refetchQueries: ['songs'],
      })
        .then(() => {
          console.log('song added');
          history.push('/');
        })
        .catch(error => console.error(error));
    },
  })
);

export default enhance(SongCreate);
