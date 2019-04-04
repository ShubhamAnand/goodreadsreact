import React from "react";
import PropTypes from "prop-types";

const SearchResult = ({ bookData, expandBook }) => {
  /**
   * truncate book title to first 4 words and append it with '...'
   * indicating it is truncated.
   * Full title will be shown in a tooltip
   */
  const bookTitle = bookData.best_book.title;
  let displayTitle = bookTitle
    .split(" ")
    .slice(0, 4)
    .join(" ");
  if (bookTitle.length > displayTitle.length) {
    displayTitle += "...";
  }

  return (
    <div className="col-lg-2 col-sm-4 col-md-3">
      <div className="card">
        <img
          className="card-img-top pl-2 pr-2 pt-2"
          src={bookData.best_book.image_url}
          alt="Book cover"
          height="200px"
        />
        <div className="card-body">
          <p
            className="text-sm-left card-title font-weight-bold"
            data-toggle="tooltip"
            data-placement="bottom"
            title={displayTitle.includes("...") ? bookTitle : ""}
          >
            {displayTitle}
          </p>
          <p className="text-sm-left card-text">
            {bookData.best_book.author.name}
          </p>

          <button
            className="btn btn-primary"
            onClick={() => expandBook(bookData)}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  bookData: PropTypes.object,
  expandBook: PropTypes.func
};

export default SearchResult;
