import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import EditIcon from "@material-ui/icons/Edit";

//Redux Stuff
import { editUserDetails } from "../../Redux/actions/userAction";
import { connect } from "react-redux";
import MyButton from "../../util/MyButton";

const styles = {
  textField: {
    margin: "10px 0"
  },
  button: {}
};

class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      bio: "",
      location: "",
      website: "",
      open: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.user.credentials);
  };
  componentDidMount() {
    this.mapUserDetailsToState(this.props.user.credentials);
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };

    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  hand;
  render() {
    const { classes } = this.props;
    return (
      <div className="edit-details">
        <MyButton
          btnClassName={classes.button}
          onClick={this.handleOpen}
          tip="Edit Details"
        >
          <EditIcon color="secondary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="2"
                placeholder="Add bio"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
                // autoFocus
                // margin="dense"
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
                autoFocus
                margin="dense"
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where do you live?"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
                autoFocus
                margin="dense"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
