import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ProgressSpinner from "@material-ui/core/CircularProgress";

//icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//Redux Stuff
import { addPost, clearErrors } from "../../Redux/actions/dataActions";
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";

const styles = {
  modal: {
    position: "relative"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  submitButton: {
    left: "85%",
    margin: "26px 0px "
  },

  closeButton: {
    position: "absolute",
    width: "40px",

    left: "90%",
    top: "1%"
  }
};
export class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      errors: {},
      open: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false });
  };
  handleChange = e => {
    this.setState({ body: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton tip="Add Post" onClick={this.handleOpen}>
          <AddIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.modal}
        >
          {loading && <ProgressSpinner className={classes.progress} />}
          <MyButton
            onClick={this.handleClose}
            tip="close"
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Add Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="POST"
                multiline
                rows="3"
                placeholder="What's on your mind?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.body}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { addPost, clearErrors })(
  withStyles(styles)(AddPost)
);
