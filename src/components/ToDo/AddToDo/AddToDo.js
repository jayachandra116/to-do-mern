import React from "react";

import "./AddToDo.css";

import NewToDoForm from "./NewToDoForm";

function AddToDo({onAdd}) {
  return (
    <section id="section-add-to-do">
      <NewToDoForm onAdd={onAdd}/>
    </section>
  );
}

export default AddToDo;
