import React, { useState } from "react";
import CardList from "./CardList";
import { useDate } from "../context/DateContext";
import CreateTodo from "./CreateTodo";
import Cookies from "js-cookie"; 
import { getCSRFTokenFromCookie } from "./getcsrf";
import { TodoContext,TodoContextProvider } from "../context/TodoContext";
import { useTodo } from "../context/TodoContext";
import { useContext } from "react";



const TodoView = () => {
  const { selectedDate, setSelectedDate } = useDate();
  const [isCreateTodoOpen, setIsCreateTodoOpen] = useState(false);
  const {todos,setTodos,getTodos}=useTodo();
  


  

  // getTodo();

  const openCreateTodoModal = () => {
    // getTodo();
    console.log("Todo Added:", todos);
    setIsCreateTodoOpen(true);
  };

  const closeCreateTodoModal = () => {
    setIsCreateTodoOpen(false);
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
    console.log("New Todo Added:", newTodo);
    console.log("Todo Added:", todos);
  };

  const handleTodoDeleted = async (todoId) => {
    try {
      const csrftoken=getCSRFTokenFromCookie();
      if (!csrftoken) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`https://backend.dorami.tanish.site/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
          'X-CSRFToken': csrftoken,
        },
        credentials:'include',
      });

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
        console.log('Todo deleted successfully');
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleTodoCompleted = async (todoId) => {
    try {
      const csrftoken=getCSRFTokenFromCookie();
      if (!csrftoken) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`https://backend.dorami.tanish.site/todos/${todoId}`, {
        method: "PUT",
        body:JSON.stringify({
          "completed" : true
        }),
        headers: {
          "Content-Type": "application/json", 
          'X-CSRFToken': csrftoken,
        },
        credentials:'include',
      });

      if (response.ok) {
        setTodos((prevTodos) => 
          prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, completed: true } : todo
          )
        );
        
        console.log('Todo completed successfully');
        
      } else {
        console.error('Failed to complete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="todoview w-full h-full">
      <div className="flex justify-between items-center pt-2 w-full mb-6">
        <div></div>
        <p className="text-2xl font-semibold">Tasks</p>
        <button
          onClick={openCreateTodoModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      {isCreateTodoOpen && (
        <CreateTodo
          onClose={closeCreateTodoModal}
          onTodoAdded={handleTodoAdded}
        />
      )}

      <div className="cards pt-6 w-full h-full">
        <CardList todos={todos} onDeleteTodo={handleTodoDeleted} onCompletedTodo={handleTodoCompleted} />
      </div>
    </div>
  );
};

export default TodoView;
