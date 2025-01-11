import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionUsername, setSessionUsername] = useState(""); // To store session username

 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    setError("");
    

    try {
      // Send POST request to your backend for login
      const response = await axios.post(
        "https://googlesheet-yuetcisb.b4a.run/login", // URL of your backend
        {
          username,
          password,
        },
        {
          withCredentials: true, // This sends cookies with the request
        }
      );

      
    } catch (err) {
      setError("Invalid username or password");
    } finally {
    
    }
  };

  const handleLogout = () => {
    // Remove username from localStorage and clear session (cookie)
    localStorage.removeItem("username");
    setIsLoggedIn(false);

    // Optionally send a logout request to the server to clear the session
    axios.post("https://googlesheet-yuetcisb.b4a.run/logout", {}, { withCredentials: true });
  };

  // Handle getting session info
  const getSessionInfo = async () => {
    try {
      const response = await axios.get("https://googlesheet-yuetcisb.b4a.run/session", {
        withCredentials: true, // Ensure cookies are sent with the request
      });

      if (response.data.username) {
        setSessionUsername(response.data.username); // Set the session username
        localStorage.setItem("username", response.data.username);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setSessionUsername("No active session or error fetching session");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 mt-[80px]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isLoggedIn ? `Welcome, ${username}` : "Login"}
        </h2>

        {!isLoggedIn ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md shadow-sm hover:bg-blue-600 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 mb-4">You are logged in as {username}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-3 rounded-md shadow-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        {/* Button to get session info */}
        <button
          onClick={getSessionInfo}
          className="w-full bg-green-500 text-white p-3 rounded-md shadow-sm hover:bg-green-600 mt-4"
        >
          Get Session Info
        </button>

        {/* Display session username */}
        {sessionUsername && (
          <h3 className="text-xl text-center mt-4 text-gray-700">
            Session Info: {sessionUsername}
          </h3>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
