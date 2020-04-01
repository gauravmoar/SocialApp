import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserData } from "../Redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";
import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";
import PostSkeleton from "../util/PostSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

export class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      postIdParam: null
    };
  }
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postIdParam = this.props.match.params.postId;
    if (postIdParam) this.setState({ postIdParam });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;
    const postMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No post found from user</p>
    ) : !postIdParam ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      posts.map(post => {
        if (post.postId !== postIdParam) {
          return <Post key={post.postId} post={post} />;
        } else {
          return <Post key={post.postId} post={post} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {postMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});
export default connect(mapStateToProps, { getUserData })(user);
