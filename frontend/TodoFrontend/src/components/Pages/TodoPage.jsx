import React from "react";
import TodoView from "../TodoView";
import Navigation from "../Navigation";


const TodoPage = () => {
  return (
    <div className="bg-gray-200 flex w-full h-full min-h-screen">

          <div className="navigation  ">
            <Navigation />
          </div>
          
          <div className="dashboard w-full h-full p-3">
            <TodoView />
          </div>

</div>
  )
}

export default TodoPage
