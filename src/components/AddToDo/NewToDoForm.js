import React from "react";
import { useFormik } from "formik";

import "./NewToDoForm.css";

const validateForm = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Can't create a blank to-do item!";
  }
  return errors;
};

function NewToDoForm(props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      completed: false,
    },
    onSubmit: (values) => {
      formSubmitHandler(values);
    },
    validate: validateForm,
  });

  const formSubmitHandler = (values) => {
    console.log("Form submit handler reached.");
    props.onAdd({
      title: formik.values.title,
    });
    console.log("Resetting formik form ...");
    formik.resetForm();
  };

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
      <button className="btn" type="submit" onClick={props.onClick}>
        Create New
      </button>
    </form>
  );
}

export default NewToDoForm;
