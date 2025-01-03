
import React, { useState,useEffect } from 'react'
import { Home, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, UserPlus, Search } from "lucide-react";
import './index.css'
import Navbar from './Components/Common/Navbar';
import Overviwepage from './Pages/Overviwepage'
import Analytics from './Pages/Analytics'
// import Productpage from './Pages/Productpage'
import Reports from './Pages/Reports'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
     
     const App = () => {
       return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
         <Route path='/' element={<Overviwepage/>}/>
         <Route path='/report' element={<Reports/>}/>
         <Route path='/analytics' element={<Analytics/>}/>
        </Routes>
        </BrowserRouter>
        
       )
     }
     
     export default App
     
