import React, { Fragment } from "react";
import noImg from "../images/noImg.png";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  Card: {
    display: "flex",
    marginBottom: 20
  },
  content: {
    flexDirection: "column",
    padding: 25,
    width: "100%"
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: "#f59822",
    marginBottom: 7
  },
  time: {
    width: 100,
    height: 14,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginBottom: 10
  },
  fullLine: {
    width: "100%",
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginBottom: 10
  },
  halfLine: {
    width: "50%",
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginBottom: 10
  }
};
const PostSkeleton = props => {
  let content;
  const { classes } = props;

  content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.Card} key={index}>
      <CardMedia className={classes.image} image={noImg} />
      <CardContent className={classes.content}>
        <div className={classes.handle} />
        <div className={classes.time} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(PostSkeleton);
