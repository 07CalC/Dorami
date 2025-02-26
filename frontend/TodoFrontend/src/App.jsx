import { useContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
  Route,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import DashboardPage from "./components/Pages/DashboardPage";
import SignInPage from "./components/Pages/SignInPage";
import SignUpPage from "./components/Pages/SignUpPage";
import TodoPage from "./components/Pages/TodoPage";
import CreateTodoPage from "./components/Pages/CreateTodoPage";
import { DateContextProvider } from "./context/DateContext";
import { UserContext, UserContextProvider } from "./context/UserContext";
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  // useEffect(() => {

  //   fetch('https://backend.dorami.tanish.site/auth/csrf/', {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //     .then(() => console.log('CSRF cookie set'))
  //     .catch(error => console.error('Error fetching CSRF token:', error));
  // }, []);

  // const isAuthenticated = false

  // useEffect(() => {
  //   // const token = Cookies.get("access_token");
  //   setIsAuthenticated(!!token);
  // }, []);

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <DashboardPage />,
  //   },
  //   {
  //     path: "/sign-in",
  //     element: <SignInPage />,
  //   },
  //   {
  //     path: "/sign-up",
  //     element: <SignUpPage />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: <DashboardPage /> ,
  //   },
  //   {
  //     path: "/todos",
  //     element: <TodoPage />,
  //   },
  //   {
  //     path: "/create-todo",
  //     element: <CreateTodoPage />,
  //   },
  // ]);

  return (
    <DateContextProvider>
      <TodoContextProvider>
        <UserContextProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/todos" element={<TodoPage />} />
              <Route path="/create-todo" element={<CreateTodoPage />} />
            </Routes>
          </HashRouter>
        </UserContextProvider>
      </TodoContextProvider>
    </DateContextProvider>
  );
}

export default App;
