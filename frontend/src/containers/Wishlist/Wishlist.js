import React, { Component } from 'react'
import axios from 'axios'

import './wishlist.css'
import Article from '../ArticleList/Article/Article'


export class Wishlist extends Component {
  state = {
    wishlist: []
  }

  componentWillMount() {
    const wishlist_id = localStorage.getItem("wishlist_id")
    console.log(wishlist_id)
    axios.get(process.env.REACT_APP_API_URL + "/wishlist/" + wishlist_id)
      .then((response) => {
        console.log(response)
        this.setState({ wishlist : response.data})
      })
      .catch((error) => {
        // handle error
        console.log(error);
      }) 
  }

  removeArticleHandler = (product_id) =>{
    const wishlist_id = localStorage.getItem("wishlist_id")
    console.log('product id ' + product_id)
    axios.delete(process.env.REACT_APP_API_URL + "/wishlist/" + wishlist_id + "/products/" + product_id)
    .then((response) => {
      console.log(response)
      axios.get(process.env.REACT_APP_API_URL + "/wishlist/" + wishlist_id)
      .then((response) => {
        console.log(response)
        this.setState({ wishlist : response.data})
      })
      .catch((error) => {
        console.log(error);
      }) 
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  render() {
    console.log(this.state.wishlist)
  
    return (
      <div className="Wishlist">
        {
          this.state.wishlist.map((article) =>
            <Article className="article"
                key={article.id}
                id={article.id}
                name={article.name}
                image={article.image}
                price={article.price}
                rating={article.rating}
                action_handler={this.removeArticleHandler}
                action="remove"
            />
            )
        }
      </div>
    )
  }
}

export default Wishlist
