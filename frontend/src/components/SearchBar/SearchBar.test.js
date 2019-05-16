import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchBar from './SearchBar'

configure({adapter: new Adapter()});

describe('<SearchBar />', () => {
  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<SearchBar />);
  });

  it('should render SearchBar with one input and a button <SearchBar />', () => {
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('button')).toHaveLength(1);
  });
});