import React from 'react';
import { css } from 'emotion';

export const errorStyle = css`
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
max-width: 400px;
display: block;
border: 1px solid red;
padding: 1em;
color: darkred;
border-radius: 2px;
background: rgba(239, 195, 195, 0.5);
`;

const Error = ({ error }) =>
  <div>
    <h3>Something went wrong!</h3>
    <code className={errorStyle}>
      {error.toString()}
    </code>
  </div>;

export default Error;
