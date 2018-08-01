import React, { Component } from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
//import sortBy from "sort-by";
import Book from './Book'
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: '',
    showingBooks: []
  };

  updateQuery = (query) => {
    this.setState({query: query.trim()}, this.searchBook)
  };

  searchBook = () => {
    if (this.state.query) {
      BooksAPI.search(this.state.query)
      .then(foundBooks => {
        if (foundBooks.length) {
          this.setState({showingBooks: foundBooks})
          console.log(this.state.showingBooks)
          
        }
      })
    } else {
      this.setState({query: '', showingBooks: []})
    }
  }

  render() {

    const { query, showingBooks } = this.state
    //let  = this.state

    
    showingBooks.sort((sortBy('title')))
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>

        {showingBooks.length > 0 && (
          <div className="search-books-results">
          <ol className="books-grid"> 
            {showingBooks.map((book) => <Book key={book.id} book={book}/>)}
          </ol>
        </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
