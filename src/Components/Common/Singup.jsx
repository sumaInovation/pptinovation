import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Singup = () => {
  const [name,setName]=useState("Guest");
 const getreq=async()=>{

  axios
  .get('https://googlesheet-yuetcisb.b4a.run/api/user', {
    withCredentials: true, // Ensure cookies are included in the request
  })
  .then((response) => {
    console.log('Response:', response.data.name);
    setName(response.data.name)
  })
  .catch((error) => {
    console.error('Error fetching the cookie:', error);
  });

 }

  const handleSuccess = async(credentialResponse) => {
    console.log('Success:', credentialResponse);

    try {
      const response = await axios.post('https://googlesheet-yuetcisb.b4a.run/api/login', {
        token: credentialResponse.credential,
      },
      {
        withCredentials: true, // Include credentials (cookies)
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
      }
    
    );
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
    // You can decode the JWT token if needed:
    // const decoded = jwt_decode(credentialResponse.credential);
    // console.log(decoded);
  };

  const handleError = () => {
    console.log('Login Failed');
  };
  return (
    <div className='mt-[80px] text-white w-1/5 '>
 
    <GoogleLogin
    onSuccess={handleSuccess}
    onError={handleError}

  />
  <div><button  onClick={getreq}>{name}</button></div>
    </div>
  )
}

export default Singup
