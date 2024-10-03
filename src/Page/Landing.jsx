import React from 'react'
import img from "../assets/hero.jpeg"
import { Link } from 'react-router-dom'
import GetStarted from '../components/GetStarted'
import Whatwedo from '../components/Whatwedo'
import ContactMe from '../components/Contactme'
import Footer from '../components/Footer'
import logo from '../assets/restraureview.png';

const Landing = () => {
    return (
        <div>
        <div className='px-4 md:px-8 '>
        <div className='px-10 py-2 md:px-16 text-1xl '>
            <div className=' flex gap-2 flex-col md:text-2xl font-semibold items-center md:flex-row md:justify-between'>
                <div >
                <div className="text-lg md:text-2xl font-bold">
        <Link to={"/"}><img src={logo} alt="RestraurReview Logo" className='h-28' /></Link>
      </div>
                </div>
                <div className='flex flex-col items-center md:text-2xl font-semibold gap-2 md:flex-row md:gap-20'>
                    <a href='#getstarted'>Get started</a>
                    <a href='#whatwedo'>What do we do</a>
                    <a href='#contact'>Contact us</a>
                </div>
            </div>
            <div className='px-8 flex flex-row mt-44 items-center '>
                {/* Left Side: Text */}
                <div className='flex flex-col w-1/2 '>
                    <span className='text-5xl font-bold'>Craving Something New?</span>
                    <span className='text-gray-300 text-5xl font-bold'>Read Reviews to Discover</span>
                    <span className='text-5xl font-bold'>Your Next Favorite Restaurant!</span>
                    <div className='text-1xl flex flex-row gap-4 mt-4'>
                        <Link to={"/register"}><button className="bg-black text-white text-2xl p-2 rounded-full px-5"> Register</button></Link>
                        <Link to={"/login"}><button className="bg-black text-white p-2 text-2xl rounded-full px-5"> Login</button></Link>
                    </div>
                </div>
            </div>
            <div id='getstarted'>
              <GetStarted></GetStarted>
            </div>
            <div id='whatwedo'>
                <Whatwedo></Whatwedo>
            </div>
            <div id="contact">
                <ContactMe></ContactMe>
            </div>
            
        </div>
        
        </div>
        <div id="footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Landing
