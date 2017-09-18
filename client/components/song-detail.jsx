import React from 'react';
import { graphql } from 'react-apollo';
import { renderComponent, branch, compose } from 'recompose';
import { Link } from 'react-router-dom';
import withLoader from './with-loader';
import fetchSong from '../queries/fetch-song';
import LyricList from './lyric-list';
import LyricCreate from './lyric-create';
import { errorStyle } from './error';

const SongDetail = ({ data: { song } }) =>
  <div>
    <Link to="/">Back</Link>
    <h3>
      Details for: {song.title}
    </h3>
    <LyricList lyrics={song.lyrics} />
    <LyricCreate songId={song.id} />
    <h4>
      Id: {song.id}
    </h4>
  </div>;

const NoSong = ({ data }) =>
  <div>
    <Link to="/">Back</Link>
    <h3>No Song found!</h3>
    <code className={errorStyle}>
      {data.error && data.error.toString()}
    </code>
  </div>;

const withNoSong = doesNotHaveSong =>
  branch(doesNotHaveSong, renderComponent(NoSong));

const enhance = compose(
  graphql(fetchSong, {
    options: ({ match }) => ({ variables: { id: match.params.id } }),
  }),
  withLoader(({ data }) => data && data.loading),
  withNoSong(({ data }) => data && !data.song)
);
export default enhance(SongDetail);
