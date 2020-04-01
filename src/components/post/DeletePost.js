import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
//MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

//Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";
//Redux
import { deletePost } from "../../Redux/actions/dataActions";

const styles = {
  delete: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};
export class DeletePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Post"
          btnClassName={classes.delete}
          onClick={this.handleOpen}
        >
          <DeleteOutline style={{ color: "red" }} />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.handleDelete} style={{ color: "red" }}>
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deletePost })(
  withStyles(styles)(DeletePost)
);
