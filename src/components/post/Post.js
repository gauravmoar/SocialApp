import React, { Component } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
// Mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//icons

import ChatIcon from "@material-ui/icons/Chat";

//REDUX
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

export class Post extends Component {
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      post: {
        userImage,
        handle,
        createdAt,
        body,
        likeCount,
        commentCount,
        postId
      },
      user: { authenticated }
    } = this.props;

    const deleteButton =
      authenticated && this.props.user.credentials.handle === handle ? (
        <DeletePost postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="profile"
          className={classes.image}
        />

        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/user/${handle}`}>{handle}</Link>
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" component="p">
            {body}
          </Typography>
          <div className="like-comment">
            <div>
              <LikeButton postId={postId} likeCount={likeCount} />
            </div>
            <div>
              <MyButton>
                <ChatIcon style={{ margin: "5px" }} color="secondary" />
                <span style={{ fontSize: "13px" }}>
                  {commentCount} Comments
                </span>
              </MyButton>
            </div>
            <PostDialog
              postId={postId}
              handle={handle}
              openDialog={this.props.openDialog}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}
Post.propTypes = {
  user: PropTypes.object.isRequired,

  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(withStyles(styles)(Post));
