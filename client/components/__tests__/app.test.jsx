import { shallow } from 'enzyme';
import React from 'react';
import App from '../app';

describe('App', () => {
  it('renders component', () => {
    const title = 'title';
    const component = shallow(<App title={title} />);
    expect(component.find('h1').text()).toBe(title);
  });
});
