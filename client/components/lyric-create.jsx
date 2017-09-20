import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { css } from 'emotion';
import addLyric from '../mutations/add-lyric';
import withError from './with-error';
import Validation from './validation';

const inputContainerStyle = css`
  display: flex;
  justify-content: space-between;
  & input {
    flex-grow: 2;
    margin-left: 20px;
  }
`;

const submitContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const LyricCreate = ({
  lyricText,
  updateLyricText,
  handleSubmit,
  validationText,
}) =>
  <form onSubmit={handleSubmit}>
    <div className={inputContainerStyle}>
      <label htmlFor="lyric">Create Lyric</label>
      <input
        type="text"
        id="lyric"
        value={lyricText}
        onChange={updateLyricText}
      />
    </div>
    {validationText && <Validation text={validationText} />}
    <div className={submitContainer}>
      <input type="submit" value="Create lyric!" />
    </div>
  </form>;

const enhance = compose(
  graphql(addLyric),
  withStateHandlers(
    ({ lyricText = '', error = null, validationText = '' }) => ({
      lyricText,
      error,
      validationText,
    }),
    {
      updateValidationText: () => text => ({
        validationText: text,
      }),
      updateLyricText: () => ({ target }) => ({
        lyricText: target.value,
      }),
      updateError: () => error => ({
        error,
      }),
    },
  ),
  withHandlers({
    handleSubmit: props => e => {
      const {
        mutate,
        lyricText,
        songId,
        updateLyricText,
        updateError,
        updateValidationText,
      } = props;
      e.preventDefault();
      if (lyricText) {
        mutate({
          variables: {
            content: lyricText,
            songId,
          },
        })
          .then(() => console.log('lyric created'))
          .catch(error => updateError(error));
        updateLyricText({ target: { value: '' } });
        updateValidationText('');
      } else {
        updateValidationText('Write a lyric');
      }
    },
  }),
  withError(({ error }) => error),
);

export default enhance(LyricCreate);
