import React from "react";
import "./Modal.css";

const MainContent = (props) => {
  return <div className="modal">{props.children}</div>;
};

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const Modal = (props) => {
  return (
    <>
      <Backdrop onClick={props.onClose} />
      <MainContent onClose={props.onClose}>{props.children}</MainContent>
    </>
  );
};

export default Modal;
