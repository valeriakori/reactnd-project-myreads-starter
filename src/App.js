import React from "react";
import { Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import BookShelfs from "./components/BookShelfs";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  // updateShelf = (book, target) => {
  //   console.log(book, target.value)
  //   BooksAPI.update(book, target.value).then(() => {
  //     BooksAPI.getAll().then(result => {
  //       this.setState({ books: result });
  //     });
  //   });
  // };

  // componentDidMount() {
  //   BooksAPI.getAll().then(result => {
  //     this.setState({ books: result });
  //   });
  // }
  updateShelf = (book, target) => {
    console.log(book.shelf, target.value)
    BooksAPI.update(book, target.value).then(() => {
      book.shelf = target.value
      this.getBooks();
      //this.render();
      console.log(book.shelf)

    });
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then(result => {
      this.setState({ books: result });
    });
  }


  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <BookShelfs books={this.state.books} updateShelf={this.updateShelf} />}
        />
        <Route
          path="/search"
          render={() => <SearchPage allBooks={this.state.books} getBooks={this.getBooks} />}
        />
      </div>
    );
  }
}

export default BooksApp;
