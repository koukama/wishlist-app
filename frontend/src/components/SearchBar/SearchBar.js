import React, { Component } from 'react'

import './SearchBar.css'

export class SearchBar extends Component {
  render() {
    return (
      <div className="SearchForm">
        <input id="query" type="text" className="SearchInput" />
        <button className="SearchButton" type="button" onClick={this.props.handler}>Search</button>                
      </div>
    )
  }
}

export default SearchBar
