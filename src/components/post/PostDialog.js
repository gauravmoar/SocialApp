import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
//Redux Stuff
import { getPost, clearErrors } from "../../Redux/actions/dataActions";
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
  profileImage: {
    width: "100%",
    borderRadius: "50%"
  },
  invisibleSeparator: {
    border: "none",
    margin: "4px"
  },
  postData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  modal: {
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "1%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  progress: {
    textAlign: "center",
    margin: 50
  }
};

export class PostDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      oldPath: "",
      newPath: ""
    };
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { postId, handle } = this.props;
    const newPath = `/user/${handle}/post/${postId}`;
    if (newPath === oldPath) oldPath = `/user/${handle}`;
    window.history.pushState(null, null, newPath);
    this.setState({ oldPath, newPath });
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        handle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress className={classes.progress} size={200} thickness={2} />
    ) : (
      <Fragment>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <img
              src={userImage}
              alt="profile"
              className={classes.profileImage}
            />
          </Grid>
          <Grid item sm={8} className={classes.postData}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/user/${this.props.handle}`}
            >
              @{handle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2">
              {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
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
            </div>
            <hr />
          </Grid>
        </Grid>
        <hr />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Fragment>
    );

    return (
      <Fragment>
        <MyButton
          tip="expand"
          onClick={this.handleOpen}
          btnClassName={classes.expandButton}
        >
          <UnfoldMore color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.modal}
        >
          <MyButton
            onClick={this.handleClose}
            tip="close"
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent style={{ textAlign: "center" }}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
PostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});
export default connect(mapStateToProps, { getPost, clearErrors })(
  withStyles(styles)(PostDialog)
);
