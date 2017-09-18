import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import addLyric from '../mutations/add-lyric';
import withError from './with-error';

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
  graphql(addLyric),
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
    handleSubmit: props => e => {
      const { mutate, lyricText, songId, updateLyricText, updateError } = props;
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
