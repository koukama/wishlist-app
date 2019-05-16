import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NavLink } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

import App from './App'
import Layout from './containers/Layout/Layout'

configure({adapter: new Adapter()});

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it('should render a Layout and a Router <App />', () => {
        expect(wrapper.find(Layout)).toHaveLength(1);
        expect(wrapper.find(Router)).toHaveLength(1);
    })
})