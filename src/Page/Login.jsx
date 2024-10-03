import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import login from "../assets/register.jpeg"
const Login = () => {
  return (
    <div className='h-[100vh] md:grid md:grid-cols-3 overflow-hidden'>
    {/* Sign Up Form - Always visible */}
    <div className=' col-span-1 h-[100vh] flex flex-col items-center justify-center'>
      <SignIn forceRedirectUrl={"/"} />
    </div>

    {/* Image - Hidden on small screens and visible on medium+ screens */}
    <div className='invisible md:visible bg-red-800 h-[100vh] col-span-2'>
      <img src={login} alt="Register" className='w-full h-full object-cover' />
    </div>
  </div>
  )
}

export default Login
