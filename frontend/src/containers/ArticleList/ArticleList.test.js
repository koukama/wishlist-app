import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ArticleList from './ArticleList'
import Article from './Article/Article'

configure({adapter: new Adapter()})

describe('<ArticleList />', () => {
  let wrapper;

  beforeEach(() => {
      let articles = [
          {
              productid: "1",
              displayName: "Stan",
              imageURL: "http://www.example.com",
              price: 123,
              reviewRating: 3.2
          },
          {
              productid: "2",
              displayName: "Boost",
              imageURL: "http://www.example.com",
              price: 123,
              reviewRating: 5.2
          },
      ]
      wrapper = shallow(<ArticleList data={articles} />);
  })

  it('should render 2 Article in the <ArticleList />', () => {
      expect(wrapper.find(Article)).toHaveLength(2)
  })
})