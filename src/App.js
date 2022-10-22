import React from "react";
import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
// create key for localstorage of the todo list
const LOCAL_STORAGE_KEY = "todos.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  // update the data in each render with setTodo
  useEffect(() => {
    const stored_Todo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored_Todo) setTodos(stored_Todo);
  }, []);

  // setting localstorage ,key make the data a string with evry render
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // add todo to the state
  function handleAddTodo(e) {
    // defining the name with useRef
    const name = todoNameRef.current.value;
    if (name === "") return;

    // setting the new todo with id,name and completion on top if all the previus todos
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
    // after each click on the button the input will be empty again
    todoNameRef.current.value = null;
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function deleteTodo() {
    const newTodos =todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
    }
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <br />
      <button onClick={handleAddTodo} className="btn btn-primary">
        add new Todo
      </button>
      <input
        type="button"
        className="btn btn-secondary"
        value="clear  Todo"
        onClick={deleteTodo}
      />
      <br />
      <div> you have {todos.length} to do left</div>
    </>
  );
}

export default App;
