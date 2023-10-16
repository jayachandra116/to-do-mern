import React, { useState } from "react";

import "./AddToDo.css";

function AddToDo() {
  const [newToDo, setNewToDo] = useState({
    title: "",
  });

  const inputChangeHandler = (e) => {
    setNewToDo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`Final state: ${newToDo.title}`);
  };

  return (
    <section id="section-add-to-do">
      <form className="add-to-do-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="create new here"
          name="title"
          value={newToDo.title}
          onChange={inputChangeHandler}
        ></input>
        <button type="submit" className="btn">
          Create New
        </button>
      </form>
    </section>
  );
}

export default AddToDo;
