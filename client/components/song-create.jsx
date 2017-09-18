import React from 'react';
import { withStateHandlers, withHandlers, compose } from 'recompose';
import { css } from 'emotion';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetch-songs';
import addSong from '../mutations/add-song';
import withError from './with-error';

const validationStyle = css`
border: 1px solid red;
padding: .25em .5em;
margin: .5em 0;
color: darkred;
border-radius: 2px;
background: rgba(239, 195, 195, 0.5);`;

const SongCreate = ({ title, updateTitle, onSubmit, validation }) =>
  <div>
    <Link to="/">Back</Link>
    <h3>Create a new song</h3>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Song Title:</label>
        <input onChange={updateTitle} value={title} name="title" />
        {validation &&
          <div className={validationStyle}>
            {validation}
          </div>}
      </div>
      <input type="submit" value="Create song!" />
    </form>
  </div>;

const enhance = compose(
  graphql(addSong),
  withStateHandlers(
    ({ title = '', validation = '', error = null }) => ({
      title,
      validation,
      error,
    }),
    {
      updateValidation: () => text => ({
        validation: text,
      }),
      updateTitle: () => ({ target }) => ({
        title: target.value,
        validation: '',
      }),
      updateError: () => error => ({
        error,
      }),
    }
  ),
  withHandlers({
    onSubmit: props => e => {
      const { title, mutate, history, updateValidation, updateError } = props;
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
        updateValidation('Write a song title');
      }
    },
  }),
  withError(({ error }) => error)
);

export default enhance(SongCreate);
