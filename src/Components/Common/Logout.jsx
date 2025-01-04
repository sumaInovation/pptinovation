// LogoutPage.js

import React, { useState, useEffect } from 'react';
import { GoogleLogout } from '@react-oauth/google'; // Import GoogleLogout component

const LogoutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate checking if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      setIsLoggedIn(true);
      setUser(token);  // You can use a real user object here if needed
    }
  }, []);

  // Handle Google logout
  const handleGoogleLogout = () => {
    // Clear the stored token or user data
    localStorage.removeItem('google_token');
    setIsLoggedIn(false);
    setUser(null);
    alert('You have logged out successfully.');
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Logout Page</h2>

      {isLoggedIn ? (
        <div>
          <p className="text-center text-xl mb-4">You are logged in!</p>
          <p className="text-center mb-6">Logged in as: {user}</p>

          {/* Google logout button */}
          <GoogleLogout
            onLogoutSuccess={handleGoogleLogout}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Log out of Google
              </button>
            )}
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl">You are not logged in.</p>
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
