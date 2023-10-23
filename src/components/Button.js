import React from "react";

import "./Button.css";

function Button(props) {
  const { onClick, type, text, classes } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={"btn " + (classes ? `${classes}` : "")}
    >
      {text}
    </button>
  );
}

export default Button;
