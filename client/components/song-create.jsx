import React from 'react';
import { withState } from 'recompose';

const SongCreate = () =>
  <div>
    <h3>Create a new song</h3>
    <form />
  </div>;

export default withState()(SongCreate);
