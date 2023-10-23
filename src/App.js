import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// import components
import AddToDo from "./components/AddToDo/AddToDo";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ToDoList from "./components/ToDoList";
import LoadingSpinner from "./components/LoadingSpinner";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const notify = (type, message) => {
    switch (type) {
      case "INFO": {
        toast.info(message);
        break;
      }
      case "SUCCESS": {
        toast.success(message);
        break;
      }
      case "WARNING": {
        toast.warn(message);
        break;
      }
      case "ERROR": {
        toast.error(message);
        break;
      }
      default: {
        toast(message);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      fetch("http://localhost:8080/todo/all")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setTodos(json.todoItems.items);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error occurred while fetching all the todo items,");
          console.log(err);
          setIsLoading(false);
          notify("ERROR", err.message);
        });
    };
    fetchData();
  }, []);

  const fetchTodos = () => {
    setIsLoading(true);
    fetch("http://localhost:8080/todo/all")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTodos(json.todoItems.items);
        setIsLoading(false);
        // notify("SUCCESS",json.message)
      })
      .catch((err) => {
        console.log("Error occurred while fetching all the todo items,");
        console.log(err);
        setIsLoading(false);
        notify("ERROR", err.message);
      });
  };

  const addToDoHandler = (todo) => {
    setIsLoading(true);
    fetch("http://localhost:8080/todo/new", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
      }),
      method: "POST",
    })
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
        fetchTodos();
        setIsLoading(false);
        notify("SUCCESS", json.message);
      })
      .catch((err) => {
        console.log("Error occurred while fetching  todo items,");
        console.log(err);
        setIsLoading(false);
        notify("ERROR", err.message);
      });
    setShowModal(false);
  };

  const updateToDoHandler = (id, payload) => {
    setIsLoading(true);
    fetch(`http://localhost:8080/todo/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
      method: "PUT",
    })
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
        fetchTodos();
        setIsLoading(false);
        notify("SUCCESS", json.message);
      })
      .catch((err) => {
        console.log("Error occurred while updating the todo item");
        console.log(err);
        setIsLoading(false);
        notify("ERROR", err.message);
      });
  };

  const deleteTodoHandler = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:8080/todo/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
        fetchTodos();
        setIsLoading(false);
        notify("SUCCESS", json.message);
      })
      .catch((err) => {
        console.log("Error occurred while deleting the todo item");
        console.log(err);
        setIsLoading(false);
        notify("ERROR", err.message);
      });
  };

  return (
    <div className="app">
      <NavBar />
      <main>
        <div className="center">
          <Button
            onClick={openModal}
            text={"Create a New To-Do"}
            type={"button"}
          />
        </div>
        {showModal &&
          createPortal(
            <Modal onClose={closeModal}>
              <AddToDo onAdd={addToDoHandler} />
              <Button onClick={closeModal} text={"Close"} />
            </Modal>,
            document.getElementById("modal")
          )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <ToDoList
            todos={todos}
            onUpdate={updateToDoHandler}
            onDelete={deleteTodoHandler}
          />
        )}
      </main>
      <Footer />
      <ToastContainer position="bottom-right" transition={Bounce} />
    </div>
  );
}

export default App;
