import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { getCSRFTokenFromCookie } from "../components/getcsrf";


export const TodoContext=createContext();

export const TodoContextProvider=({children})=>{
    const[todos,setTodos]=useState([]);
    const getTodo=async ()=>{
        try {
          const csrftoken=getCSRFTokenFromCookie();
          const response = await fetch("https://backend.dorami.tanish.site/todos/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'X-CSRFToken': csrftoken,
            },

            credentials: "include",
            withCredentials: true
          });
          
          if (response.ok) {
            
            const data2 = await response.json()
            setTodos(data2);
            // console.log(data2)
            console.log("Successful got todos");
          } else {
            // console.log("Failed to get todos");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }

      useEffect(() => {
        getTodo();
      }, []);

    return(
        <TodoContext.Provider value={{todos,setTodos,getTodo}}>
            {children}
        </TodoContext.Provider> 
    )

}

export const useTodo = () => useContext(TodoContext);
