import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin login
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/admin-dashboard");
    }
    // Customer login
    else if (email && password) {
      navigate("/shop");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="flex-1 bg-blue-600 text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4">Shoppex</h1>
        <p className="text-lg font-light text-center px-4">Don't delay, purchase today!</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6 py-12">
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Login
            </button>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* 👇 New Register Link */}
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">New user? </span>
              <Link to="/register" className="text-sm text-blue-600 hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
