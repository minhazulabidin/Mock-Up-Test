import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewQues from './_compo/AddNewQues'

const page = () => {
  return (
    <div className='max-w-full md:max-w-7xl mx-auto p-10'>
      <h2 className='text-2xl font-bold'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and start you Ai Mockup</h2>
     <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
       <AddNewQues />
     </div>
    </div>
  )
}

export default page
