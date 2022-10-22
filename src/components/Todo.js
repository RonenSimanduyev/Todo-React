import React from "react";

function Todo({ todo, toggleTodo }) {
  function handlTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handlTodoClick}
        />
        {todo.name}
      </label>
    </div>
  );
}

export default Todo;
