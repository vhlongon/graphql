import React from 'react';

const App = ({ title }) =>
  <div className="app">
    <h1 style={{ fontSize: '2em' }}>
      {title}
    </h1>
  </div>;

App.defaultProps = {
  title: 'Graphql authentication',
};

export default App;
