import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from 'axios'
import uniqid from 'uniqid'


import Layout from './containers/Layout/Layout'
import Home from './containers/Home/Home'
import Wishlist from './containers/Wishlist/Wishlist'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {

  constructor(props) {
    super(props)
    console.log("Init app")
    console.log("API URL :", process.env.REACT_APP_API_URL)
    const wishlist_id = uniqid()
    if (!localStorage.getItem("wishlist_id")) {
      console.log("Creating the wishlist")
      axios.post(process.env.REACT_APP_API_URL + "/wishlist", {id: wishlist_id})
        .then((response) => {
          console.log(response)
          localStorage.setItem("wishlist_id", wishlist_id)
          console.log("wishlist id stored in localstorage")
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    } else {
      //the wishlist exists in storage, but we check also in the API
      axios.get(process.env.REACT_APP_API_URL + "/wishlist/" + localStorage.getItem("wishlist_id"))
        .then((response) => {
          console.log("The wishlist exists in the API " + localStorage.getItem("wishlist_id"))
        })
        .catch((error) => {
          // Here the wishlist don't exists, we try to create it again
          axios.post(process.env.REACT_APP_API_URL + "/wishlist", {id: wishlist_id})
          .then((response) => {
            console.log(response)
            localStorage.setItem("wishlist_id", wishlist_id)
            console.log("wishlist id stored in localstorage")
          })
          .catch((error) => {
            console.log(error);
          })
          console.log(error);
        })
    }
    //localStorage.removeItem("wishlist_id")
    console.log("wishlist_id : " + localStorage.getItem("wishlist_id"))
  }
  render() {
    return (
      <div className="App">
        <Layout>
          <Router>
              <NavBar />
              <Route path="/" exact component={Home} />
              <Route path="/wishlist" component={Wishlist} />
          </Router>
        </Layout>
      </div>
    );
  }
}

export default App; 
