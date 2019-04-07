import React, { Component } from "react";
import Axios from "axios";
import AllResults from "./AllResults";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LoaderCustom from "./Loader";


const apiKey = process.env.REACT_APP_API_KEY;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  loader:{ 
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

class Search extends Component {
  state = {
    searchText: "",
    error: "",
    fetchingData: false
  };

  onTextChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  onButtonClick = () => {
    this.setState({
      fetchingData: true
    });
    const { searchText } = this.state;
    var config = {headers: {"X-Requested-With" : "XMLHttpRequest"}};
    const requestUri =`https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchText}`;

    Axios.get(requestUri,config)
      .then(res => {
        this.parseXMLResponse(res.data);
      })
      .catch(error => {
        this.setState({
          error: error.toString(),
          fetchingData: false
        });
      });
  };

  onRefreshButtonClick = () => {
    this.setState({
      searchText: "",
      fetchingData: false
    }, () => {
      this.onButtonClick();
    });
  };



  // parse string xml received from goodreads api
  parseXMLResponse = response => {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        error: "There was an error fetching results.",
        fetchingData: false
      });
    } else {
      const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
      const searchResults = XMLresults.map(result => this.XMLToJson(result));
      this.setState({ fetchingData: false }, () => {
        this.props.setResults(searchResults);
      });
    }
  };

  // Function to convert simple XML document into JSON.
  // Loops through each child and saves it as key, value pair
  // if there are sub-children, call the same function recursively on its children.
  XMLToJson = XML => {
    const allNodes = new Array(...XML.children);
    const jsonResult = {};
    allNodes.forEach(node => {
      if (node.children.length) {
        jsonResult[node.nodeName] = this.XMLToJson(node);
      } else {
        jsonResult[node.nodeName] = node.innerHTML;
      }
    });
    return jsonResult;
  };

  render() {
    return (
      
      <div>
        <Paper className={styles.paper}>
      <AppBar className={styles.searchBar} position="static" color="default" elevation={0}>
         <Toolbar>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
            <Icon className={classNames(styles.block,styles.rightIcon,styles.iconSmall)} color="inherit">search</Icon>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search Books By title, author, or ISBN..."
                InputProps={{
                  disableUnderline: true,
                  className: styles.searchInput,
                }}
                onChange={this.onTextChange}
                value={this.state.searchText}
              />
            </Grid>
            <Grid item>
              <Button onClick={this.onButtonClick} variant="contained" color="primary" className={styles.addUser}>
                Search
              </Button>
              <Tooltip title="Reload">
                <IconButton onClick={this.onRefreshButtonClick}>
                <Icon className={styles.block} color="inherit" color="inherit">refresh</Icon>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
        </AppBar>
    </Paper>
        <div className="form-group row">
        </div>

        {/**
         * if fetching data, display "loading...", if error, display error message, else display search results
         */}
        {this.state.fetchingData ? (
          <p className="lead text-center"><LoaderCustom className={styles.loader}/>{""}</p>
        ) : (
          (this.state.error && (
            <div class="alert alert-danger" role="alert">
            {this.state.error}
            </div>
          )) || (
            <AllResults
              books={this.props.results}
              expandBook={this.props.expandBook}
            />
          )
        )}
      </div>
    );
  }
}

Search.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
  expandBook: PropTypes.func
};

export default Search;
