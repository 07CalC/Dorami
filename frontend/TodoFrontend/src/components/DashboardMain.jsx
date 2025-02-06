import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/TodoContext";
import { getCSRFTokenFromCookie } from "./getcsrf";
import { useUser } from "../context/UserContext";

const DashboardMain = () => {
  const { todos, setTodos } = useTodo();
  const {user,setUser, isAuthenticated, setIsAuthenticated}=useUser()

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userContext.isAuthenticated);
    if (!userContext.isAuthenticated) navigate("/sign-in");
  },[isAuthenticated]);

  const handleTodoCompleted = async (todoId) => {
    try {
      const csrftoken = getCSRFTokenFromCookie();
      if (!csrftoken) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`https://backend.dorami.tanish.site/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({
          completed: true,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
      });

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, completed: true } : todo
          )
        );

        console.log("Todo completed successfully");
      } else {
        console.error("Failed to complete todo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main p-4 sm:p-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6">
        <p className="text-xl sm:text-2xl font-semibold">Dashboard</p>
      </div>

      <div className="topcards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div className="card bg-white rounded-lg shadow-md text-center p-4">
          <p className="text-base sm:text-lg font-semibold text-gray-500">
            Total Todos
          </p>
          <p className="text-2xl sm:text-3xl font-semibold">{todos.length}</p>
        </div>
        <div className="card bg-white rounded-lg shadow-md text-center p-4">
          <p className="text-base sm:text-lg font-semibold text-gray-500">
            Completed Tasks
          </p>
          <p className="text-2xl sm:text-3xl font-semibold">
            {todos.filter((todo) => todo.completed).length}
          </p>
        </div>
      </div>

      <div className="recent-tasks bg-white rounded-lg p-4 sm:p-6 mt-7 shadow-md">
        <p className="text-lg sm:text-xl text-slate-800 font-semibold mb-4">
          Recent Todos
        </p>
        {todos.slice(0, 3).map((todo) => (
          <div
            key={todo.id}
            className="recent-card bg-gray-100 rounded-lg flex flex-col sm:flex-row items-start p-4 mb-4 shadow-sm"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoCompleted(todo.id)}
              className="w-5 h-5 mt-1 sm:mt-0 sm:mr-4"
            />
            <div>
              <p
                className={`font-medium text-gray-800 mb-1 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMain;
