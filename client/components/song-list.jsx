import React from 'react';
import { graphql } from 'react-apollo';
import { withHandlers, compose } from 'recompose';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import withLoader from './with-loader';
import fetchSongs from '../queries/fetch-songs';
import deleteSong from '../mutations/delete-song';

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

const SongList = ({ data, onSongDelete }) =>
  <div>
    <ul className={listStyle}>
      {data.songs.map(({ title, id }) =>
        <li className={listItemStyle} key={id}>
          <span className={titleStyle}>
            <Link to={`/songs/${id}`}>
              {title}
            </Link>
          </span>
          <button data-id={id} onClick={onSongDelete(id)}>
            delete
          </button>
        </li>
      )}
    </ul>
    <Link to="/songs/new">Add Song</Link>
  </div>;

SongList.defaultProps = {
  data: {
    songs: [],
  },
};

const enhance = compose(
  graphql(deleteSong),
  graphql(fetchSongs),
  withHandlers({
    onSongDelete: ({ mutate, data }) => id => e => {
      e.preventDefault();
      mutate({
        variables: { id },
      }).then(() => data.refetch());
    },
  }),
  withLoader(({ data }) => data && data.loading)
);

export default enhance(SongList);
