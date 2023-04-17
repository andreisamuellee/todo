import React from "react";
import { useTodoHandlers } from "../api/useTodoHandlers";
import { ITodo } from "../interfaces/todo.interface";
import Todo from "./Todo";

interface IListTodoProps {
  todos: any;
  setTodos: Function;
}

export default function ListTodos(props: IListTodoProps) {
  const { deleteTodo, updateTodo } = useTodoHandlers({
    todos: props.todos,
    setTodos: props.setTodos,
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        {props.todos.map((todo: ITodo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              description={todo.description}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            ></Todo>
          );
        })}
      </div>
    </>
  );
}
