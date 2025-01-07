import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
    const URL="https://googlesheet-yuetcisb.b4a.run"
  //const URL = "http://localhost:5000"

  useEffect(() => {
     // Fetch user profile from the server on app load
     fetch(`${URL}/user/profile`, { credentials: "include" }) // Include cookies
     .then((res) => res.json())
     .then((data) =>{
       const userDetials=jwtDecode(data.newtoken)
       const user={
         name:userDetials.name,
         picture:userDetials.picture
       }
       
      setUserData(user);
      console.log(user)

     })
     .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleLoginSuccess = async (responsegoogle) => {

    const token = responsegoogle.credential
    try {
      
      const response = await fetch(`${URL}/user/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}), // Send the user value in the request body
          credentials: 'include', // Include cookies with the request
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    console.log(data);

    

     
  } catch (error) {
      console.error('Error setting cookie:', error.message);
  }

    
    
  
  
//Refetch user profile(getting cookies for find user object)
     // Fetch user profile from the server on app load
    fetch("http://localhost:5000/user/profile", { credentials: "include" }) // Include cookies
      .then((res) => res.json())
      .then((data) =>{
        const userDetials=jwtDecode(data.newtoken)
        const user={
          name:userDetials.name,
          picture:userDetials.picture
        }
        
       setUserData(user);
       

      })
      .catch((err) => console.error("Error fetching profile:", err));

  
  }
  const handleLogout = async () => {

     await fetch(`${URL}/user/logout`, {
      method: "POST",
      credentials: "include", // Send cookies with the request
    })
      .then((res) => {
        if (res.ok) {

          setUserData(null); // Clear user from context
          localStorage.removeItem("auth"); // Remove user data from localStorage (if used)
          sessionStorage.removeItem("auth"); // Remove user data from sessionStorage (if used)
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

