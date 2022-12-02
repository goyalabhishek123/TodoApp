import React, { useEffect, useState } from 'react'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../API';
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const Display:React.FC = () => {
    const [Todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [Todos]);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data }: ITodo[] | any) => {
        setTodos(data);
      })

      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not saved");
        }

        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id: number): void => {
    deleteTodo(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />

      {Todos?.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </div>
  )
}

export default Display
