import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from "react-router-dom";

import NavBar from './NavBar';

configure({adapter: new Adapter()});

describe('<NavBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it('should render two <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
});