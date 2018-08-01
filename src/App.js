import React from "react";
import { Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import BookShelves from "./components/BookShelves";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
    .then(result => {
      this.setState({books: result})
    })
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={() => <BookShelves 
            books={this.state.books}
          />} 
        />
        <Route 
          path="/search" 
          render={() => (<SearchPage 
            allBooks={this.state.books}
          />)} 
        />
      </div>
    );
  }
}

export default BooksApp;
