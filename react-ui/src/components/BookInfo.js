import React, { Component } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import StarRatingComponent from 'react-star-rating-component';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

const apiKey = process.env.REACT_APP_API_KEY;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  block: {
    display: 'block',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  }
});

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "Fetching description for this book...",
      error: ""
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  getDescription = () => {
    const bookId = this.props.bookData.best_book.id;
    const requestUri =`https://cors-anywhere.herokuapp.com/`+`https://www.goodreads.com/book/show/${bookId}?key=${apiKey}`;
    Axios.get(requestUri)
      .then(res => {
        const parser = new DOMParser();
        const XMLResponse = parser.parseFromString(res.data, "application/xml");

        const parseError = XMLResponse.getElementsByTagName("parsererror");

        if (parseError.length) {
          this.setState({
            error: "There was an error fetching results."
          });
        } else {
          let description = XMLResponse.getElementsByTagName("description")[0]
            .innerHTML;

          description = description.replace("<![CDATA[", "").replace("]]>", "");

          if (!description) {
            description = "No description found.";
          }
          this.setState({ description });
        }
      })
      .catch(error => {
        this.setState({
          error: error.toString()
        });
      });
  };

  render() {
    const { bookData } = this.props;
    return (
      <div className="row col-lg-12">
       <Button onClick={this.props.collapseBook} variant="contained" color="primary" className={styles.button}>
       <Icon className={classNames(styles.block,styles.rightIcon,styles.iconSmall)} color="inherit">arrow_back_ios</Icon> Go Back 
          </Button>
        <h3 className="col-lg-12 mb-3 mt-3">{bookData.best_book.title}</h3>
        <div className="col-lg-2 col-sm-4 ">
          <img
            src={bookData.best_book.image_url}
            height="200px"
            width="130px"
            alt="book cover"
          />
          <p>
            By:{" "}
            <span className="font-weight-bold">
              {bookData.best_book.author.name}
            </span>
          </p>
          <p>Avg. Rating:{bookData.average_rating}
          <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span><Icon className={classNames(styles.block,styles.rightIcon,styles.iconSmall)} color="inherit">star</Icon></span>}
          starCount={5}
          value={bookData.average_rating}
          />
         </p>
        </div>
        <div className="col-lg-10 col-sm-8">
          {(this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )) || (
            <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
          )}
        </div>
        <div>
          <p>
            Published Date:{" "}
            {`${bookData.original_publication_day}/${
              bookData.original_publication_month
            }/${bookData.original_publication_year}`}
            .{" "}
            <a
              href={`https://www.goodreads.com/book/show/${
                bookData.best_book.id
              }`}
            >
              Learn More
            </a>
          </p>
        </div>
      </div>
    );
  }
}

BookInfo.propTypes = {
  bookData: PropTypes.object,
  collapseBook: PropTypes.func
};

export default BookInfo;
