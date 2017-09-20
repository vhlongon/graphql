import React from 'react';
import { graphql } from 'react-apollo';
import { withState, withHandlers, compose } from 'recompose';
import { css } from 'emotion';
import deleteLyric from '../mutations/delete-lyric';
import withError from './with-error';

const deleteStyle = css`
  width: 35px;
  height: 25px;
  & span {
    margin-left: 5px;
  }
`;

const DeleteLyricButton = ({ onDelete, onDeleted, id }) =>
  <button className={deleteStyle} onClick={onDelete(id, onDeleted)}>
    <span role="img" aria-label="cross-bones">
      ☠
    </span>
  </button>;

const enhance = compose(
  graphql(deleteLyric),
  withState('error', 'updateError', null),
  withHandlers({
    onDelete: ({ mutate, updateError }) => (id, onDeleted) => e => {
      e.preventDefault();
      mutate({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteLyric: {
            id: null,
            __typename: 'LyricType',
          },
        },
      })
        .then(() => {
          if (onDeleted) {
            onDeleted();
          }
        })
        .catch(error => updateError(error));
    },
  }),
  withError(({ error }) => error),
);
export default enhance(DeleteLyricButton);
