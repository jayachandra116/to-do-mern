import React, { useState } from "react";

import Modal from "../UI/Modal";
import ToDoEdit from "./ToDoEdit/ToDoEdit";

import "./ToDoItem.css";

function ToDoItem(props) {
  const { item, onUpdate, onDelete } = props;
  const [isUpdating, setIsUpdating] = useState(false);

  const makeToDoUpdatable = (item) => {
    console.log("Making todo item writable ...");
    <Modal title="Edit Todo">{}</Modal>;
    setIsUpdating(true);
  };

  const makeToDoReadOnly = () => {
    console.log("Making todo item read only ...");
    setIsUpdating(false);
  };

  const content = isUpdating ? (
    <ToDoEdit
      todoItem={item}
      onBackdropClose={makeToDoReadOnly}
      onModalClose={makeToDoReadOnly}
      onTodoEditSubmit={onUpdate}
      onTodoDelete={onDelete}
    />
  ) : (
    <li
      key={item._id}
      className="todo-list__item"
      onClick={() => makeToDoUpdatable(item)}
    >
      <div>
        {item.title}
        {item.isCompleted ? " ( Completed )" : " ( Not Completed )"}
      </div>
    </li>
  );

  return content;
}

export default ToDoItem;
