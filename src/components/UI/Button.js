import React from "react";

import "./Button.css";

function Button({ onClick, type, text, classes, disabled }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={"btn " + (classes ? `${classes}` : "")}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
