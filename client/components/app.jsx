import React from 'react';
import SongList from './song-list';

const App = ({ text }) =>
  <div className="app">
    <h1 style={{ fontSize: '2em' }}>
      {text}
    </h1>
    <SongList />
  </div>;

export default App;
