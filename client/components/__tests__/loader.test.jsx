import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../loader';

describe('Loader', () => {
  it('get the correct class', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.hasClass('loader')).toBeTruthy();
  });
});
