import React from "react";
import Card from "./Card";
import { useDate } from "../context/DateContext";
import moment from "moment";


const CardList = ({todos,onDeleteTodo,onCompletedTodo}) => {
  const { selectedDate } = useDate(); 

  

  const filterTodos = selectedDate
  ? todos.filter((todo) => {
    // console.log(todo,selectedDate)
      return moment(todo.due_date , 'x').isSame(moment(selectedDate, 'x')); 
    })
  : todos;

  // console.log(todos)
  // console.log(filterTodos)

  // console.log(moment(todos[0].dueDate , 'x').format('x'));
  // console.log(selectedDate)
  // console.log(todos[0].dueDate)



  return (
    <>
      {filterTodos.length > 0 && (
       <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-center">
        {filterTodos.map((todo, index) => (
          <Card
            key={todo.id}
            id={todo.id}
            label={todo.label}
            title={todo.title}
            description={todo.description}
            dueDate={todo.due_date}
            onDeleteTodo={()=>onDeleteTodo(todo.id)}
            onCompletedTodo={()=>onCompletedTodo(todo.id)}
            completed={todo.completed}
          />
        ))}
        </div>
      )} 
      {filterTodos.length === 0 && (
        <div className="w-full h-full p-8 flex items-center justify-center">
        <img src="https://cdn.dribbble.com/userupload/23376562/file/original-ac0acdba9a5ef7169322a147bb2005e2.jpg?resize=752x&vertical=center" alt="No todos for today" className="sm:w-1/2 w-full" />
        </div>
      )}
      
      </>
  );
};

export default CardList;