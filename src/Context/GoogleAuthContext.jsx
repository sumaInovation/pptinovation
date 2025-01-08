import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';
import Cookies from 'js-cookie';
export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const URL="https://googlesheet-yuetcisb.b4a.run"
 // const URL = "http://localhost:5000"


  const handleLoginSuccess = async (response) => {
    
    
       const decodedata=jwtDecode(response.credential);
       const{name,email,picture}=decodedata;
       const user={name,email,picture}
       
      try {
        
  
        const res = await axios.post('https://googlesheet-yuetcisb.b4a.run/login', user,{
          withCredentials: true, // Send cookies or credentials with the request
          headers: {
            'Content-Type': 'application/json',
          }});
          console.log(res);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
      getProfiledta();  
  
   }
   const getProfiledta=async()=>{
    const cookieValue = Cookies.get('token');
       try{
    const res = await axios.post('https://googlesheet-yuetcisb.b4a.run/profile', cookieValue,{
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

