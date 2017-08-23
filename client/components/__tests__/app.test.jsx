import { shallow } from 'enzyme';
import React from 'react';
import App from '../app';

describe('App', () => {
  it('renders component', () => {
    const text = 'text';
    const component = shallow(<App text={text} />);
    expect(component.text()).toBe(text);
  });
});
