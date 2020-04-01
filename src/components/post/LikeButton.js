import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

import { likePost, unlikePost } from "../../Redux/actions/dataActions";

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.postId)
    ) {
      return true;
    } else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };
  render() {
    const {
      user: { authenticated },
      likeCount
    } = this.props;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="like">
          <FavoriteBorder color="secondary" />
        </MyButton>
      </Link>
    ) : this.likedPost() ? (
      <MyButton tip="unlike" onClick={this.unlikePost}>
        <Favorite style={{ margin: "5px" }} color="secondary" />
        <span style={{ fontSize: "13px" }}> {likeCount} likes</span>
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likePost}>
        <FavoriteBorder style={{ margin: "5px" }} color="secondary" />
        <span style={{ fontSize: "13px" }}> {likeCount} likes</span>
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { likePost, unlikePost })(LikeButton);
