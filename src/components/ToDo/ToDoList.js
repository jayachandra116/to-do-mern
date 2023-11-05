import React from "react";

import "./ToDoList.css";
import ToDoItem from "./ToDoItem";

function ToDoList(props) {
  const { todos, onAdd, onUpdate, onDelete } = props;

  const content =
    todos.length >= 1 ? (
      <ul className="todo-list__list">
        {todos.map((todo) => (
          <ToDoItem
            item={todo}
            key={todo._id}
            onAdd={onAdd}
            onUpdate={onUpdate}
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
