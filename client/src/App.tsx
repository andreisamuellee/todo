import React from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import { ITodo } from "./interfaces/todo.interface";

function App() {
  const [todos, setTodos] = React.useState<Array<ITodo>>([]);

  return (
    <>
      <div className="flex overflow-hidden w-full h-screen font-poppins justify-center ">
        <div className="h-fit w-full sm:w-96">
          <div className="p-5">
            <h1 className="text-3xl">
              <span className="text-emerald-400">to</span>
              <span className="text-red-400">do</span>
              <span className="text-purple-400">list</span>
            </h1>
            <div className="text-gray-500 italic mb-1">
              swipe to delete, double click to edit :)
            </div>
            <InputTodo todos={todos} setTodos={setTodos}></InputTodo>
          </div>
          <ListTodos setTodos={setTodos} todos={todos}></ListTodos>
        </div>
      </div>
    </>
  );
}

export default App;
