import React from "react";

import "./ToDoList.css";
import ToDoItem from "./ToDoItem";

function ToDoList(props) {
  const { todos, onUpdate, onDelete } = props;

  const content =
    todos.length >= 1 ? (
      <ul className="todo-list__list">
        {todos.map((todo) => (
          <ToDoItem
            item={todo}
            onUpdate={onUpdate}
            key={todo._id}
            onDelete={onDelete}
          />
        ))}
      </ul>
    ) : (
      <h2>No items to show</h2>
    );
  return <section id="section-todo-list">{content}</section>;
}

export default ToDoList;
