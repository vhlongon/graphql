import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';

const containerStyle = css`
  background: rgba(239, 195, 195, 0.8);
  color: darkred;
  border-radius: 2px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

export const errorStyle = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 400px;
  display: block;
  border: 1px solid #c17878;
  padding: 1em;
  margin: 1em;
  border-radius: 2px;
`;

const Error = ({ error }) =>
  <div className={containerStyle}>
    <p>Something went wrong!</p>
    <code className={classnames(errorStyle)}>
      {error ? error.toString() : 'Something went wrong'}
    </code>
  </div>;

export default Error;
