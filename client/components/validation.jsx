import React from 'react';
import { css } from 'emotion';
import classnames from 'classnames';
import { errorStyle } from './error';

const validationStyle = css`
  padding: .25em .5em;
  margin: .5em 0;
  background: rgba(239, 195, 195, 0.5);
`;

const Validation = ({ text }) =>
  <div className={classnames(errorStyle, validationStyle)}>
    {text}
  </div>;

export default Validation;
