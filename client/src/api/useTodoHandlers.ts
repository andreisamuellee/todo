import { useEffect } from "react";
import { ITodo } from "../interfaces/todo.interface";

interface IListTodoProps {
  todos: any;
  setTodos: Function;
}

export const useTodoHandlers = (props: IListTodoProps) => {
  const { setTodos } = props;

  const loadTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(
        "http://localhost:4000/todos/" + id.toString(),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTodos((todos: Array<ITodo>) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id: number, value: string) => {
    try {
      const body = { description: value };
      const response = await fetch(
        "http://localhost:4000/todos/" + id.toString(),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTodos((todos: Array<ITodo>) =>
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, description: value };
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    deleteTodo,
    updateTodo,
  };
};
