import React from 'react'
import useAuthStore from '../store/authStore';
const Homepage = () => {
  const{user}=useAuthStore();
  return (
    <div className='text-6xl text-center'>
    {user &&  <h1>Welcome {user.name}</h1>}
    </div>
  )
}

export default Homepage
