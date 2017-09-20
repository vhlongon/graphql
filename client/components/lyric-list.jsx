import React from 'react';
import { withState, compose } from 'recompose';
import { css } from 'emotion';
import Lyric from './lyric';
import withLoader from './with-loader';
import withError from './with-error';

const listStyle = css`
  text-align: center;
  list-style-type: none;
  padding-left: 0;
  width: 400px;
  maxWidth: 100%;
`;

const LyricList = ({ lyrics, refetchData }) =>
  <div>
    <ul className={listStyle}>
      {lyrics.map(Lyric(refetchData))}
    </ul>
  </div>;

LyricList.defaultProps = {
  lyrics: [],
};

const enhance = compose(
  withState('error', 'updateError', null),
  withLoader(({ data }) => data && data.loading),
  withError(({ error }) => error),
);

export default enhance(LyricList);
