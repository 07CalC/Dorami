import React from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { getCSRFTokenFromCookie } from "./getcsrf";
import { data } from 'react-router-dom';


const CreateTodo = ({ onClose, onTodoAdded }) => {
  const { register, handleSubmit, watch , reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const newTodo = { 
      title: data.title, 
      description: data.description, 
      due_date: moment(data.dueDate).startOf('day').format('x'),
      label: data.label 
    };
    console.log(newTodo)
    const csrftoken=getCSRFTokenFromCookie();
      console.log(csrftoken)
    try {
      
      
      const response = await fetch("https://backend.dorami.tanish.site/todos/create/", {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken,
        },
        credentials: "include",
        body: JSON.stringify(newTodo),
        
      });

      if (response.ok) {
        const todo = await response.json();
        onTodoAdded(todo);  
        reset();  
        onClose();  
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Create New Todo</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Title </label>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter title"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Enter description"
              rows="3"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              {...register('label')}
              placeholder="Enter label (e.g., Personal, Work)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1"> Date </label>
            <input
              type="date"
              {...register('dueDate', { required: ' Date is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
