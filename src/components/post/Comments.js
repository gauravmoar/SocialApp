import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  commentImage: {
    width: "100%",
    borderRadius: "50%"
  },
  commentData: {
    textAlign: "start",
    padding: "20px"
  }
};
export class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { createdAt, handle, userImage, body } = comment;
          return (
            <Fragment key={index}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="profile"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        component={Link}
                        to={`/user/${handle}`}
                        color="primary"
                      >
                        @{handle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
                {index !== comments.length - 1 && <hr />}
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
