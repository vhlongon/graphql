import React from 'react';
import {
  withStateHandlers,
  withState,
  withHandlers,
  withProps,
  compose,
} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
  mutation addSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = ({ title, updateTitle, onSubmit, mutate }) =>
  <div>
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
    onSubmit: ({ title, mutate }) => e => {
      e.preventDefault();
      console.log('submitting form with title: ', title);
      mutate({
        variables: {
          title,
        },
      });
    },
  })
);

export default enhance(SongCreate);
