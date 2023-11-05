import React from "react";
import ReactDOM from "react-dom";

import Button from "./Button";
import "./Modal.css";

const modal = ({title,children,onCancelModal,onAcceptModal, isLoading}) =>
  ReactDOM.createPortal(
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <div className="modal__content">{children}</div>
      <div className="modal__actions">
        <Button onClick={onCancelModal} text={"Cancel"}/>
      </div>
    </div>,
    document.getElementById("modal-root")
  );

export default modal;
