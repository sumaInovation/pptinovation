import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  //const URL="https://googlesheet-yuetcisb.b4a.run/user"
  const URL = "http://localhost:5000/user"

  // useEffect(() => {
  //   // Fetch user profile from the server on app load
  //   fetch(`${URL}/profile`, { credentials: "include" }) // Include cookies
  //     .then((res) => res.json())
  //     .then((data) =>{ setUserData(data)

  //     })
  //     .catch((err) => console.error("Error fetching profile:", err));
  // }, []);

  const handleLoginSuccess = async (responsegoogle) => {

    const token = responsegoogle.credential
    try {
      // Make the POST request using fetch
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server that we're sending JSON
        },
        body: JSON.stringify({ name: 'John', email: 'john@example.com' }), // Convert the object to a JSON string
      });

      // Parse the response from the backend
      const data = await response.json();
      console.log(data.Message);  // Log the message from the server

    } catch (error) {
      console.error('Error sending data:', error);
    }

    
    
  
  
//Refetch user profile(getting cookies for find user object)
      //  try {
      //       const response = await fetch('http://localhost:5000/user/profile', {
      //         method: 'GET',
      //         credentials: 'include',  // This sends the cookie with the request
      //       });
      
      //       const data = await response.json();
      //       console.log(data.message);  // Should say "Welcome john_doe!"
      //     } catch (error) {
      //       console.error('Error fetching profile:', error);
      //     }
  
  }
  const handleLogout = async () => {

    fetch(`${URL}/logout`, {
      method: "POST",
      credentials: "include", // Send cookies with the request
    })
      .then((res) => {
        if (res.ok) {

          setUserData(null); // Clear user from context
          localStorage.removeItem("authToken"); // Remove user data from localStorage (if used)
          sessionStorage.removeItem("authToken"); // Remove user data from sessionStorage (if used)
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => console.error("Error logging out:", err));
  };

  return (
    <GoogleAuthContext.Provider value={{ userData, handleLoginSuccess, handleLogout }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleContext = () => useContext(GoogleAuthContext);

