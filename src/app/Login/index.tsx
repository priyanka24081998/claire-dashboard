"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear errors
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://claireapi.onrender.com/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        setError("Invalid login credentials.");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      {/* Loader styling (can also be put globally) */}
      <style jsx>{`
        .loader {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default Login;
