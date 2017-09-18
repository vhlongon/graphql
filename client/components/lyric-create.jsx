import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withError from './with-error';

const mutation = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

const LyricCreate = ({ lyricText, updateLyricText, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <label htmlFor="lyric">Create Lyric</label>
    <input
      type="text"
      id="lyric"
      value={lyricText}
      onChange={updateLyricText}
    />
  </form>;

const enhance = compose(
  graphql(mutation),
  withStateHandlers(
    ({ lyricText = '', error = null }) => ({ lyricText, error }),
    {
      updateLyricText: () => ({ target }) => ({
        lyricText: target.value,
      }),
      updateError: () => error => ({
        error,
      }),
    }
  ),
  withHandlers({
    handleSubmit: ({
      mutate,
      lyricText,
      songId,
      updateLyricText,
      updateError,
    }) => e => {
      e.preventDefault();
      mutate({
        variables: {
          content: lyricText,
          songId,
        },
      })
        .then(() => console.log('lyric created'))
        .catch(error => updateError(error));

      updateLyricText({ target: { value: '' } });
    },
  }),
  withError(({ error }) => error)
);

export default enhance(LyricCreate);
