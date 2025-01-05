import React, { createContext, useState, useContext, useEffect } from "react";
export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
    const URL="https://googlesheet-yuetcisb.b4a.run/user/"
    //const URL="http://localhost:5000/user"

  useEffect(() => {
    // Fetch user profile from the server on app load
    fetch(`${URL}/profile`, { credentials: "include" }) // Include cookies
      .then((res) => res.json())
      .then((data) =>{ setUserData(data)
        
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleLoginSuccess = async (response) => {
    const token=response.credential
    
      try {
        const response = await fetch(`${URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token
          }),
          credentials: "include", // Include cookies for session tokens
        });
  
        if (response.ok) {
          const data = await response.json(); // Parse JSON response
         console.log(data)
          
            
        } else {
          const errorData = await response.json();
          console.log(errorData)
        }
      } catch (err) {
        console.error("Error:", err);
        
      }
    

    

    // //Refetch user profile
    fetch(`${URL}/profile`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>{ setUserData(data)
        console.log(data)
      });
  };

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

