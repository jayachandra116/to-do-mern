import React from "react";

import "./AddToDo.css";

import NewToDoForm from "./NewToDoForm";

function AddToDo(props) {
  return (
    <section id="section-add-to-do">
      <NewToDoForm onAdd={props.onAdd}/>
    </section>
  );
}

export default AddToDo;
