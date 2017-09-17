import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetch-songs';
import addSong from '../mutations/add-song';

const SongCreate = ({ title, updateTitle, onSubmit }) =>
  <div>
    <Link to="/">Back</Link>
    <h3>Create a new song</h3>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Song Title:</label>
        <input onChange={updateTitle} value={title} name="title" />
      </div>
      <input type="submit" value="Create song!" />
    </form>
  </div>;

const enhance = compose(
  graphql(addSong),
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
        refetchQueries: [{ query: fetchSongs }],
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
