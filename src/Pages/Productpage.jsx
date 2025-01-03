import React from 'react'

const Productpage = () => {
  return (
    <div className='text-white text-center mt-[80px]'>
    <section>
      <h1 className='lg:text-5xl text-3xl '>INVENTORY SYSTEM</h1>
    </section>
    <section className='flex space-x-2 justify-evenly m-3'>
     <div className='w-1/3 min-h-[100px] bg-blue-400 rounded-lg shadow-lg'></div>
     <div className='w-1/3 min-h-[100px] bg-blue-400 rounded-lg shadow-lg'></div>
     <div className='w-1/3 min-h-[100px] bg-blue-400 rounded-lg shadow-lg'></div>
    </section>
    </div>
  )
}

export default Productpage
