import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//icons

import HomeIcon from "@material-ui/icons/Home";
//Redux
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";

import AddPost from "../post/AddPost";
import Notification from "./Notifications";

export class Navbar extends Component {
  render() {
    const {
      user: { authenticated }
    } = this.props;
    return (
      <AppBar>
        <div className="nav-container">
          <Toolbar>
            {authenticated ? (
              <Fragment>
                <AddPost />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon color="secondary" />
                  </MyButton>
                </Link>
                <Notification />
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}
Navbar.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Navbar);
