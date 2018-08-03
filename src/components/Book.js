import React, { Component } from "react";

class Book extends Component {
  render() {
    let image;
    this.props.book.imageLinks
      ? (image = this.props.book.imageLinks.thumbnail)
      : (image = "../icons/No_image_available.svg");
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {this.props.book.imageLinks && (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${image})`
                }}
              />
            )}

            <div className="book-shelf-changer">
              <select
                onChange={event => {
                  this.props.updateShelf(this.props.book, event.target);
                }}
                value={this.props.book.shelf || "none"}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors
              ? this.props.book.authors.join(" & ")
              : "No Author(s) found"}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
