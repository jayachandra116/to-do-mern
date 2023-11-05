import { Fragment } from "react";
import { useFormik } from "formik";

import BackDrop from "../../UI/BackDrop";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

const ToDoEdit = ({
  onBackdropClose,
  onModalClose,
  onTodoEditSubmit,
  onTodoDelete,
  todoItem,
}) => {

  const validateForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Can't create a blank to-do item!";
    }
    return errors;
  };

  const todoUpdateHandler = () => {
    console.log("Update todo reached.");
    console.log(
      `New values: ${formik.values.title}, ${formik.values.isCompleted}`
    );
    console.log(`Todo Item id: ${todoItem._id}`);
    onTodoEditSubmit(todoItem._id, {
      title: formik.values.title,
      isCompleted: formik.values.isCompleted,
    });
    onModalClose()
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      title: todoItem.title || "",
      isCompleted: todoItem.isCompleted || false,
    },
    onSubmit: todoUpdateHandler,
    validate: validateForm,
  });

  return (
    <Fragment>
      <BackDrop onClick={onBackdropClose} />
      <Modal title="Edit Todo" onCancelModal={onModalClose}>
        <section>
          <form onSubmit={formik.handleSubmit} className="to-do-edit-form">
            <div className="input-group">
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={todoItem.title}
              />
            </div>
            <div className="input-group">
              <label htmlFor="completed">Mark as complete?</label>
              <input
                type="checkbox"
                name="isCompleted"
                checked={formik.values.isCompleted}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <Button
              type={"submit"}
              text={"Update"}
              onClick={todoUpdateHandler}
            />
            <Button
              type={"button"}
              text={"Delete"}
              onClick={() => onTodoDelete(todoItem._id)}
            />
          </form>
        </section>
      </Modal>
    </Fragment>
  );
};

export default ToDoEdit;

