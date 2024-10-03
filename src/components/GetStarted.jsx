import React from 'react'
import indi from "../assets/indi.png"
import home from '../assets/home.png'
import login from "../assets/loginpage.png"
import pos from "../assets/positivereview.png"
import neg from "../assets/negativereview.png"

const GetStarted = () => {
  return (
    <div className='px-4 md:px-8'>
      
      {/* Login Section */}
      <div className='rounded-xl mt-10 flex flex-col md:flex-row items-center justify-between p-6 bg-gray-100 shadow-md'>
        <span className='text-3xl md:text-5xl font-bold text-center md:text-left'>
          Login or register to get started
        </span>
        <img src={login} alt="Login or Register" className='w-full md:w-2/3 mt-4 md:mt-0' />
      </div>
      
      {/* Top Restaurants Section */}
      <div className='rounded-xl mt-10 flex flex-col md:flex-row items-center justify-between p-6 bg-gray-100 shadow-md'>
        <img src={home} alt="Top Restaurants" className='w-full md:w-2/3 mb-4 md:mb-0' />
        <div className='flex flex-col'>
          <span className='text-3xl md:text-5xl font-bold text-center md:text-left'>
            Top Restaurants in Your Area
          </span>
          <p className='mt-2 text-red-500 text-center md:text-left'>
            Please allow location access for this feature
          </p>
        </div>
      </div>
      
      {/* Express Your Feelings Section */}
      <div className='rounded-xl mt-10 flex flex-col items-center p-6 bg-gray-100 shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <img src={indi} alt="Individual" className='h-64 md:h-96 w-full object-cover' />
          <img src={pos} alt="Positive Review" className='h-64 md:h-96 w-full object-cover' />
          <img src={neg} alt="Negative Review" className='h-64 md:h-96 w-full object-cover' />
        </div>
        <div className='text-center'>
          <span className='text-3xl md:text-5xl font-bold'>
            Express Your Feelings About the Food and Services
          </span>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
