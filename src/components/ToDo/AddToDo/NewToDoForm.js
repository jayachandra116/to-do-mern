import React from "react";
import { useFormik } from "formik";

import "./NewToDoForm.css";

function NewToDoForm({ onAdd }) {
  
  const formSubmitHandler = (values) => {
    console.log("Form submit handler reached.");
    onAdd({
      title: formik.values.title,
    });
    console.log("Resetting formik form ...");
    formik.resetForm();
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Can't create a blank to-do item!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      completed: false,
    },
    onSubmit: formSubmitHandler,
    validate: validateForm,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="add-to-do-form">
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Create new todo here"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.title && formik.errors.title ? `error-field` : ``
        }
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="error-title">{formik.errors.title}</div>
      ) : null}
      <button className="btn" type="submit">
        Create New
      </button>
    </form>
  );
}

export default NewToDoForm;
