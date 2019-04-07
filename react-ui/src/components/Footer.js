import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    footer: {
  width: '100%',
  height: 100,
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
    }
});

class Footer extends Component {
  render() {
    return (
        <footer class="page-footer font-small blue">
        <div class="footer-copyright text-center py-3">© 2019 Copyright:
        <a href="https://github.com/ShubhamAnand/"> Shubham Anand</a>
        </div>
        </footer>
    );
  }
}

export default Footer;