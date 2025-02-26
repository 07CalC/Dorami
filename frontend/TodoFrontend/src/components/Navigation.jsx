import React, { useState } from "react";
import { IoToday } from "react-icons/io5";
import { FiMenu } from "react-icons/fi"; 
import { NavLink, Link } from "react-router-dom";
import Calender from "./Calender";
import { useUser } from "../context/UserContext";  

const Navigation = () => {
  const { user } = useUser();  
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
      
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 border-r-2 border-black shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="OopsLater text-center sm:text-left p-5">
          <p className="text-2xl sm:text-3xl font-semibold font-mono">Dorami</p>
        </div>

        <div className="links flex-grow">
          <ul className="pt-6 sm:pt-9 pl-2 sm:pl-5">
            <li className="text-lg sm:text-2xl font-medium pb-3 sm:pb-4">
              <Link 
                to="/dashboard" 
                className="block py-2 px-4 sm:px-5 rounded-lg hover:bg-gray-100 hover:shadow-md"
                onClick={() => setIsOpen(false)} 
              >
                Dashboard
              </Link>
            </li>
            <li className="text-lg sm:text-2xl font-medium pb-3 sm:pb-4">
              <Link 
                to="/todos" 
                className="block py-2 px-4 sm:px-5 rounded-lg hover:bg-gray-100 hover:shadow-md"
                onClick={() => setIsOpen(false)} 
              >
                Todos
              </Link>
            </li>
          </ul>
        </div>

        
        <div className="pt-6 sm:pt-8 px-2 sm:px-4" onClick={() => setIsOpen(false)}>
          <Calender />
        </div>

        
        <div 
          className="profile flex pt-4 sm:pt-6 px-4 sm:px-6 items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-xl shadow-md py-2"
          onClick={() => setIsOpen(false)} 
        >
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300"
            alt="Profile"
          />
          <p className="text-base sm:text-lg font-medium text-gray-700">
            {user ? user.username : "Guest"}  
          </p>
        </div>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;