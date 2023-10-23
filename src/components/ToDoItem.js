import React, { useState } from "react";
import { useFormik } from "formik";

import "./ToDoItem.css";

const validateForm = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Can't create a blank to-do item!";
  }
  return errors;
};

function ToDoItem(props) {
  const { item, onUpdate, onDelete } = props;
  const [isUpdating, setIsUpdating] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: item.title,
      isCompleted: item.isCompleted,
    },
    onSubmit: (values) => {
      todoUpdateHandler(values);
    },
    validate: validateForm,
  });

  const makeToDoUpdatable = () => {
    console.log("Making todo item writable ...");
    setIsUpdating(true);
  };

  const makeToDoReadOnly = () => {
    console.log("Making todo item read only ...");
    setIsUpdating(false);
  };

  const todoUpdateHandler = (values) => {
    console.log("Update todo reached.");
    console.log(
      `New values: ${formik.values.title}, ${formik.values.isCompleted}`
    );
    console.log(`Todo Item id: ${item._id}`);
    onUpdate(item._id, {
      title: formik.values.title,
      isCompleted: formik.values.isCompleted,
    });
    setIsUpdating(false);
    formik.resetForm();
  };

  const content = isUpdating ? (
    <li key={item._id} className="todo-list__item">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={item.title}
        />
        <label htmlFor="completed"> Mark as complete? </label>
        <input
          type="checkbox"
          name="isCompleted"
          checked={formik.values.isCompleted}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="submit">Update</button>
        <button onClick={makeToDoReadOnly} type="button">
          Cancel
        </button>
        <button
          onClick={() => {
            onDelete(item._id);
          }}
          type="button"
        >
          Delete
        </button>
      </form>
    </li>
  ) : (
    <li key={item._id} className="todo-list__item" onClick={makeToDoUpdatable}>
      <div>
        {item.title}
        {item.isCompleted ? " ( Completed )" : " ( Not Completed )"}
      </div>
    </li>
  );

  return content;
}

export default ToDoItem;
