import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { css } from 'emotion';
import withLoader from './with-loader';

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
  <ul className={listStyle}>
    {data.songs.map(({ title, id }) =>
      <li key={id}>
        {title}
      </li>
    )}
  </ul>;

SongList.defaultProps = {
  data: {
    songs: [],
  },
};

const enhance = compose(
  graphql(query),
  withLoader(({ data }) => data && data.loading)
);

export default enhance(SongList);
