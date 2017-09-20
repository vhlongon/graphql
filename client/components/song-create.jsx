import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import fetchSongs from '../queries/fetch-songs';
import addSong from '../mutations/add-song';
import withError from './with-error';
import Validation from './validation';

const containerStyle = css`
  min-width: 320px;
  width: 100%;
`;

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

const SongCreate = ({ title, updateTitle, onSubmit, validationText }) =>
  <div className={containerStyle}>
    <Link to="/">← Back</Link>
    <h3>Create a new song</h3>
    <form onSubmit={onSubmit}>
      <div className={inputContainerStyle}>
        <label htmlFor="title">Song Title:</label>
        <input onChange={updateTitle} value={title} name="title" />
        {validationText && <Validation text={validationText} />}
      </div>
      <div className={submitContainer}>
        <input type="submit" value="Create song!" />
      </div>
    </form>
  </div>;

const enhance = compose(
  graphql(addSong),
  withStateHandlers(
    ({ title = '', validationText = '', error = null }) => ({
      title,
      validationText,
      error,
    }),
    {
      updateValidationText: () => text => ({
        validationText: text,
      }),
      updateTitle: () => ({ target }) => ({
        title: target.value,
        validation: '',
      }),
      updateError: () => error => ({
        error,
      }),
    },
  ),
  withHandlers({
    onSubmit: props => e => {
      const {
        title,
        mutate,
        history,
        updateValidationText,
        updateError,
      } = props;
      e.preventDefault();
      if (title) {
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
          .catch(error => updateError(error));
      } else {
        updateValidationText('Write a song title');
      }
    },
  }),
  withError(({ error }) => error),
);

export default enhance(SongCreate);
