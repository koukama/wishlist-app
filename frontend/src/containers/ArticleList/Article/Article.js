import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

import './Article.css'

export class Article extends Component {

  render() {
    const p = this.props
    let actionButton
    if (p.action === "add") {
      actionButton = <button type='button' className="AddButton" onClick={() => p.action_handler(p.id, p.name, p.price, p.image,parseFloat(p.rating))}>Add to wishlist</button>
    } else if (p.action === "remove") {
      actionButton = <button type='button' className="removeButton" onClick={() => p.action_handler(p.id)}>remove</button>
    }
    return (
      <div className="article">
        <div className="row">
          <div className="col-sm">
            <img src={p.image} alt ="shoes_img" className="ArticleImage"/>
          </div>
          <div className="col-sm price">
            <p> {p.name}</p>
            <p> {p.price} €</p>
          </div>
          <div className="col-sm stars">
            <StarRatings
              rating={parseFloat(p.rating)}
              starDimension="30px"
            />
            {actionButton}
          </div>
        </div>
      </div>
    )
  }
}

export default Article
