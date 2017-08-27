import React from 'react';
import { css } from 'emotion';

const style = css`
height: 200vh;
width: 100vw;
color: white;
display: flex;
justify-content: center;
font-size: 2em;
font-family: sans-serif;
padding: 200px 1em;
background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
`;

const App = ({ text }) =>
  <div className={style}>
    {text}
  </div>;

export default App;
