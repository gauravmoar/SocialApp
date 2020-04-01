import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux
import { connect } from "react-redux";
import { submitComment } from "../../Redux/actions/dataActions";

const styles = {
  form: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
    padding: 12
  },
  textField: {
    width: "85%",
    float: "left"
  },
  button: {
    position: "absolute",
    top: "20%",
    right: "2%"
  }
};

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.UI.errors);
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }
  handleChange = e => {
    this.setState({ body: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body });
    this.setState({ body: "" });
  };
  render() {
    const { errors, body } = this.state;
    const { classes, authenticated } = this.props;
    const formMarkup = authenticated ? (
      <Fragment>
        <Grid container sm={12}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              name="comment"
              type="text"
              label="Comment"
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={body}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Fragment>
    ) : null;
    return formMarkup;
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});
export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
