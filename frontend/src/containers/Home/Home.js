import React, { Component } from 'react'
import axios from 'axios'

import './Home.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import ArticleList from '../ArticleList/ArticleList'

export class Home extends Component {

  state = {
    data: []
  }

  


  searchHandler = (e) => {
    const query = document.getElementById('query').value
    axios.get("https://www.adidas.co.uk/api/search/suggestions/" + query)
      .then((response) => {
        console.log(response.data.products)
        this.setState({ data : response.data.products})
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  render() {
    return (
      <div className="Home">
        <SearchBar handler={this.searchHandler} />
        <ArticleList data={this.state.data} action="add"/>
      </div>
    )
  }
}

export default Home
