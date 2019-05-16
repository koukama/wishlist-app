import React, { Component } from 'react'
import axios from 'axios'
import FlashMessage from 'react-flash-message'

import Article from './Article/Article'
import './ArticleList.css'

export class ArticleList extends Component {
  
  state = {
    error : ""
  }

  addArticleHandler = (id, name, price, image, rating) =>{
    const wishlist_id = localStorage.getItem("wishlist_id")
    axios.post(process.env.REACT_APP_API_URL + "/wishlist/" + wishlist_id + "/products" , {id, name, price, image, rating})
    .then((response) => {
      console.log(response)

    })
    .catch( (error) => {
      console.log(error)
      this.setState({ error : error.response.data.message})
    })
}
  render() {
    const p = this.props
    let error
    if (this.state.error ){
      error = <FlashMessage duration={1000}>
                <div className="errorMessage">
                  {this.state.error}
                </div>
              </FlashMessage>
    }

    return (
      <div className="ArticleList">
        {error}
        {
          p.data.map((article) =>
            <Article className="article"
                key={article.productid}
                id={article.productid}
                name={article.displayName}
                image={article.imageURL}
                price={article.price}
                rating={article.reviewRating}
                action_handler={this.addArticleHandler}
                action={p.action}
            />
          )
        }
      </div>
    )
  }
}

export default ArticleList
