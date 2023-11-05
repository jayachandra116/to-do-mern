import { useContext, useEffect, useState } from "react";
// import { createPortal } from "react-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// import components
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import LoginForm from "./components/LoginForm";
import AddToDo from "./components/ToDo/AddToDo/AddToDo";
import ToDoList from "./components/ToDo/ToDoList";

import { AuthContext } from "./context/AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  const [todos, setToDos] = useState([]);

  const fetchMyTodos = () => {
    fetch("http://localhost:8080/todo/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authContext.user.token,
      },
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error("Validation failed!");
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error!");
          throw new Error("Fetching todo Failed!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          toast("Fetched todos successfully");
          setToDos(resData.todos);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err);
      });
  };

  const addTodoHandler = async (todo) => {
    fetch("http://localhost:8080/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authContext.user.token,
      },
      body: JSON.stringify({
        ...todo,
      }),
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error("Validation failed!");
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error!");
          throw new Error("adding new todo Failed!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          toast(resData.message);
          fetchMyTodos();
        } else {
          throw new Error(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err);
      });
  };

  const updatedToDoHandler = (id, todo) => {
    fetch("http://localhost:8080/todo/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authContext.user.token,
      },
      body: JSON.stringify({
        ...todo,
      }),
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error("Validation failed!");
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error!");
          throw new Error("updating todo Failed!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          fetchMyTodos();
        } else {
          throw new Error(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err);
      });
  };

  const deleteToDoHandler = (id) => {
    fetch("http://localhost:8080/todo/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authContext.user.token,
      },
    })
      .then((result) => {
        if (result.status === 422) {
          throw new Error("Validation failed!");
        }
        if (result.status !== 200 && result.status !== 201) {
          console.log("Error!");
          throw new Error("deleting todo Failed!");
        }
        return result.json();
      })
      .then((resData) => {
        if (resData.status === "success") {
          fetchMyTodos();
        } else {
          throw new Error(resData.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err);
      });
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      fetchMyTodos();
    }
  }, [authContext]);

  let mainSection;

  if (authContext.isLoggedIn) {
    mainSection = (
      <div>
        <AddToDo onAdd={addTodoHandler} />
        <ToDoList
          todos={todos}
          onAdd={addTodoHandler}
          onDelete={deleteToDoHandler}
          onUpdate={updatedToDoHandler}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <NavBar />
      <section className="main-section">
        {!authContext.isLoggedIn && <LoginForm />}
        {authContext.isLoggedIn && mainSection}
      </section>
      {authContext.isLoggedIn && <Footer />}
      <ToastContainer position="bottom-right" transition={Bounce} />
    </div>
  );
}

export default App;
