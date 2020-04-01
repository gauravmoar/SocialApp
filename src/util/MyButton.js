import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default function MyButton(props) {
  const { children, tip, btnClassName, onClick, tipClassName } = props;
  return (
    <Tooltip title={tip} className={tipClassName} placement="bottom-end">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
