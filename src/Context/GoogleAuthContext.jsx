import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const URL="https://googlesheet-yuetcisb.b4a.run"
 // const URL = "http://localhost:5000"


  const handleLoginSuccess = async (response) => {
       const token=response.profileObj
      try {
        // const data = {
        //   name: 'wimaladasa',
        //   email: 'sumanga0000@gmail.com',
        // };
  
        const res = await axios.post('https://googlesheet-yuetcisb.b4a.run/post', token,{
          withCredentials: true, // Send cookies or credentials with the request
          headers: {
            'Content-Type': 'application/json',
          }});
          console.log(res);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    
  
   }
  const handleLogout = async () => {
    axios.get('https://googlesheet-yuetcisb.b4a.run/deleteCookie',{ withCredentials: true }).then((res) =>{
      console.log(res.data)
    })
   };
  

  return (
    <GoogleAuthContext.Provider value={{ userData, handleLoginSuccess, handleLogout }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleContext = () => useContext(GoogleAuthContext);

