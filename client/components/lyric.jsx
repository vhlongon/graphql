import React from 'react';
import { css } from 'emotion';
import LikeLyricButton from './like-lyric-button';
import DeleteLyricButton from './delete-lyric-button';

const buttonContainerStyles = css`
display: flex;
justify-content: flex-end;
align-items: center;
`;

const listItemStyle = css`
display: flex;
justify-content: space-between;
align-items: center;
background-color: rgba(255,255,255,0.2);
border-radius: 2px;
border: 1px solid purple;
margin: 5px 0;
padding: 5px;
width: 100%;

`;

const titleStyle = css`
text-align: left;
max-width: 280px;
`;

const Lyric = refetchData => ({ content, id, likes }) =>
  <li className={listItemStyle} key={id}>
    <span className={titleStyle}>
      {content}
    </span>
    <div className={buttonContainerStyles}>
      <LikeLyricButton likes={likes} id={id} />
      <DeleteLyricButton id={id} onDeleted={refetchData} />
    </div>
  </li>;

export default Lyric;
