import React from 'react';
import { graphql } from 'react-apollo';
import { withState, withHandlers, compose } from 'recompose';
import { css } from 'emotion';
import likeLyric from '../mutations/like-lyric';
import withError from './with-error';

const likeStyle = css`
  width: 45px;
  height: 25px;
  margin-right: 5px;
  & span {
    margin-right: 2px;
  }
`;

const LikeLyricButton = ({ onLike, id, likes }) =>
  <button className={likeStyle} onClick={onLike(id, likes)}>
    <span role="img" aria-label="thumbs-up">
      👍🏽 {likes}
    </span>
  </button>;

const enhance = compose(
  graphql(likeLyric),
  withState('error', 'updateError', null),
  withHandlers({
    onLike: ({ mutate, updateError }) => (id, likes) => e => {
      e.preventDefault();
      mutate({
        variables: { id },
        // this makes sure we get a response right away instead of waiting an instance
        // to get it back from the server, the best way to make sure the following properties are correct
        // is by looking at the network tab on devtools and copy the body of the mutation request from there
        // what we are essentially doing is copying the mutation
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id,
            __typename: 'LyricType',
            likes: likes + 1,
          },
        },
      })
        // eslint-disable-next-line
        .then(() => console.log('liked'))
        .catch(error => updateError(error));
    },
  }),
  withError(({ error }) => error),
);
export default enhance(LikeLyricButton);
