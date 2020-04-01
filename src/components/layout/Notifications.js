import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import { connect } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// Mui stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { markNotificationsRead } from "../../Redux/actions/userAction";

const styles = {};
export class Notifications extends Component {
  constructor() {
    super();
    this.state = { anchorEl: null };
  }

  handleOpen = e => {
    this.setState({ anchorEl: e.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(not => !not.read)
      .map(not => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const anchorEl = this.state.anchorEl;
    const notifications = this.props.notifications;
    dayjs.extend(relativeTime);

    let notificationIcon;
    let filterLength = notifications.filter(not => not.read === false).length;

    if (filterLength > 0) {
      notificationIcon = (
        <Badge badgeContent={filterLength} color="secondary">
          <NotificationsIcon color="secondary" />
        </Badge>
      );
    } else {
      notificationIcon = <NotificationsIcon color="secondary" />;
    }

    let notificationMarkup;
    if (notifications && notifications.length > 0) {
      notificationMarkup = notifications.map(not => {
        const verb = not.type === "like" ? " liked " : " commented on ";
        const iconColor = not.read ? "primary" : "secondary";
        const time = dayjs(not.createdAt).fromNow();
        const icon =
          not.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ margin: "10px" }} />
          ) : (
            <ChatIcon color={iconColor} style={{ margin: "10px" }} />
          );
        return (
          <MenuItem onClick={this.handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/user/${not.recipient}/post/${not.postId}`}
              variant="body1"
              color={not.read ? "primary" : "secondary"}
            >
              {not.sender}
              {verb}
              your post {time}
            </Typography>
          </MenuItem>
        );
      });
    }
    return (
      <Fragment>
        <ToolTip placement="top" title="notifications">
          <IconButton
            aria-controls={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </ToolTip>
        <Menu
          anchorEl={anchorEl}
          onEntered={this.onMenuOpened}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {notificationMarkup}
        </Menu>
      </Fragment>
    );
  }
}
Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  notifications: state.user.notifications
});
export default connect(mapStateToProps, { markNotificationsRead })(
  withStyles(styles)(Notifications)
);
