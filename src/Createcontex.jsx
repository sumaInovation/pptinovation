import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check session on component mount
  useEffect(() => {
    axios
      .get('https://googlesheet-yuetcisb.b4a.run/session', {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.username);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = async (username) => {
    try {
      const response = await axios.post(
        'https://googlesheet-yuetcisb.b4a.run/login',
        { username },
        { withCredentials: true }
      );
      setUser(response.data.username);
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'https://googlesheet-yuetcisb.b4a.run/logout',
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
