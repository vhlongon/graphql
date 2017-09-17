import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import withLoader from './with-loader';
import fetchSongs from '../queries/fetch-songs';

const query = gql`
  {
    songs {
      title
      id
    }
  }
`;

const listStyle = css`
  text-align: center;
  list-style-type: none;
  padding-left: 0;
`;

const SongList = ({ data }) =>
  <div>
    <ul className={listStyle}>
      {data.songs.map(({ title, id }) =>
        <li key={id}>
          {title}
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
  graphql(fetchSongs),
  withLoader(({ data }) => data && data.loading)
);

export default enhance(SongList);
