import React from 'react';
import { graphql } from 'react-apollo';
import { withState, withHandlers, compose } from 'recompose';
import { css } from 'emotion';
import likeLyric from '../mutations/like-lyric';
import withLoader from './with-loader';
import withError from './with-error';

const listStyle = css`
  text-align: center;
  list-style-type: none;
  padding-left: 0;
  width: 400px;
  maxWidth: 100%;
`;

const listItemStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

`;

const titleStyle = css`
  text-align: left;
`;

const likeStyle = css`
  width: 65px;
  & span {
    margin-right: 5px;
  }
`;

const LyricList = ({ lyrics, onLike }) =>
  <div>
    <ul className={listStyle}>
      {lyrics.map(({ content, id, likes }) =>
        <li className={listItemStyle} key={id}>
          <span className={titleStyle}>
            {content}
          </span>
          <button className={likeStyle} onClick={onLike(id, likes)}>
            <span role="img" aria-label="thumbs-up">
              👍🏽
            </span>{' '}
            {likes}
          </button>
        </li>,
      )}
    </ul>
  </div>;

LyricList.defaultProps = {
  lyrics: [],
};

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
        .then(() => console.log('liked'))
        .catch(error => updateError(error));
    },
  }),
  withLoader(({ data }) => data && data.loading),
  withError(({ error }) => error),
);

export default enhance(LyricList);
