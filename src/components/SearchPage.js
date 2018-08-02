import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: "",
    showingBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query }, this.searchBook);
  };

  searchBook = () => {
    if (this.state.query) {
      BooksAPI.search(this.state.query).then(foundBooks => {
        if (foundBooks.length) {
          this.setState({ showingBooks: foundBooks });
        } else {
          this.setState({ showingBooks: [] });
        }
      });
    } else {
      this.setState({ query: "", showingBooks: [] });
    }
  };

  render() {
    const { query, showingBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={query}
              onChange={e => this.updateQuery(e.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>

        {/* {showingBooks.length === 0 && (
          <p>
            No Books found (yet). Please, update your search
          </p>
        )} */}

        {showingBooks.length > 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map(book => <Book key={book.id} book={book} updateShelf={this.props.updateShelf}/>)}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchPage;
