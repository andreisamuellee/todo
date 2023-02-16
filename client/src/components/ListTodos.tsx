import React from "react";
import { ITodo } from "../interfaces/todo.interface";
import Todo from "./Todo";

interface IListTodoProps {
  todoChanges: number;
  setTodoChanges: Function;
}

export default function ListTodos(props: IListTodoProps) {
  const [todos, setTodos] = React.useState<Array<ITodo>>([]);

  const loadTodos = async () => {
    try {
      await fetch("/todos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setTodos(data));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    loadTodos();
  }, [props.todoChanges]);

  return (
    <>
      <div className="flex flex-col gap-1">
        {todos.map((todo: ITodo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              description={todo.description}
              setTodoChanges={props.setTodoChanges}
            ></Todo>
          );
        })}
      </div>
    </>
  );
}
