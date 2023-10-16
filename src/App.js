import "./App.css";

// import components
import AddToDo from "./components/AddToDo";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <AddToDo />
        <section id="section-todo-list"></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
