import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const listItemStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const titleStyle = css`
  text-align: left;
`;

const Song = onSongDelete => ({ title, id }) =>
  <li className={listItemStyle} key={id}>
    <span className={titleStyle}>
      <Link to={`/songs/${id}`}>
        {title}
      </Link>
    </span>
    <button onClick={onSongDelete(id)}>delete</button>
  </li>;

export default Song;
