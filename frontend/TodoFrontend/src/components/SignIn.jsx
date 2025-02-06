import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";
// import { getCSRFTokenFromCookie } from "./getcsrf";

const SignIn = () => {
  const form = useForm();
  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;
  const navigate = useNavigate();
  const userContext = useContext(UserContext)

  useEffect(() => {
  if(userContext.isAuthenticated) navigate("/")
  }, [userContext.isAuthenticated])

  const onSubmit = async (data) => {
    
    try {
      
      const response = await fetch("https://backend.dorami.tanish.site/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(data),
        credentials: "include",
        withCredentials: true
      });
      // const data2 = await response.json()
      // console.log(data2)

      if (response.ok) {
        // const result = await response.json();
        // Cookies.set("access_token", result.access_token, { expires: 30 });
        console.log("Login successful");
        // console.log("Backend Response:", result);
        // console.log(result.data.access_token);
        userContext.setIsAuthenticated(true)
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
