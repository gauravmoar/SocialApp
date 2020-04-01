import React, { Component } from "react";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import PostSkeleton from "../util/PostSkeleton";

//MUI stuff
import Grid from "@material-ui/core/Grid";
//REDUX
import { connect } from "react-redux";
import { getAllPosts } from "../Redux/actions/dataActions";

export class home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    console.log(posts);

    let recentPostsMarkup = !loading ? (
      posts.map(post => (
        <Post post={post} key={post.postId}>
          {post.body}
        </Post>
      ))
    ) : (
      // <p>Loading..</p>
      <PostSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getAllPosts })(home);
