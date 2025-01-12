import React, { useState } from 'react';
import {GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState(null); // To store user info after login

  // Handle traditional login form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login', // Replace with your backend login endpoint
        formData,
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log('Traditional Login Response:', response.data);
      setUser(response.data.user); // Assuming your backend returns the user info
    } catch (error) {
      console.error('Error during traditional login:', error);
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
     try {
      const response = await axios.post(
        'http://localhost:5000/api/login', // Replace with your backend Google login endpoint
        { token: credentialResponse.credential },
        {
          withCredentials: true, // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setUser(response.data.user); // Assuming your backend returns the user info
    } catch (error) {
      console.error('Error during Google login:', error);
    }



    
  


  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
  };

  return (
  
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Log In</h2>

          {/* Traditional Login Form */}
          <form onSubmit={handleFormSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              Log In
            </button>
          </form>

          {/* Google Login */}
          <div className="text-center mb-4">
            <p className="text-gray-500">Or log in with Google</p>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            size="large"
            text="continue_with"
            className="w-full flex justify-center"
          />

          {/* Display user info after login */}
          {user && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">Welcome back, {user.name}!</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Login;
