import React from 'react';
import { css } from 'emotion';
import SongList from './song-list';

const style = css`
height: 100vh;
width: 100vw;
color: white;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: sans-serif;
background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
`;

const App = ({ text }) =>
  <div className={style}>
    <h1 style={{ fontSize: '2em' }}>
      {text}
    </h1>
    <SongList />
  </div>;

export default App;
