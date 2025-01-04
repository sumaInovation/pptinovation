import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create GoogleAuthContext
export const GoogleAuthContext = createContext();

// GoogleAuthProvider to wrap the app
export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage when the app loads
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData)); // Parse and set user data from localStorage
    }
  }, []);

  // Save user data to localStorage after login success
  const handleLoginSuccess = (response) => {
    const decodedData = jwtDecode(response.credential); // Decode the JWT token
    setUserData(decodedData); // Save the user data in state
    localStorage.setItem('userData', JSON.stringify(decodedData)); // Save data in localStorage
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  const handleLogout = () => {
    setUserData(null); // Clear user data from state
    localStorage.removeItem('userData'); // Remove user data from localStorage
  };

  return (
    <GoogleAuthContext.Provider value={{ userData, handleLoginSuccess, handleLoginFailure, handleLogout }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

// Custom hook to access context
export const useGoogleContext = () => useContext(GoogleAuthContext);
