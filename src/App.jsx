
import React, { useState, useEffect, Children } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import Homepage from './pages/Homepage'
import Singuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import useAuthStore from './store/authStore';
import DashboardPage from './pages/Dashbord';
const App = () => {
   const{checkAuth,isAuthtenicted,user}=useAuthStore();
   useEffect(()=>{
     checkAuth();
  },[checkAuth]);
  
  return (
    <BrowserRouter >
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Singuppage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/dashbord' element={<DashboardPage />} />
      </Routes>
    
    </BrowserRouter>

  )
}

export default App