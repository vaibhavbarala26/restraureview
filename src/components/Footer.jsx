import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-no-background.png';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          
          {/* Logo and Intro */}
          <div className='flex flex-col items-center md:items-start'>
            <Link to="/">
              <img src={logo} alt="RestraurReview Logo" className='h-28 mb-4' />
            </Link>
            <p className='text-gray-400 text-center md:text-left'>
              Discover the best restaurants in your area, read reviews, and share your dining experiences. We help you find your next favorite place to eat!
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to="/" className='text-gray-400 hover:text-white'>Home</Link>
              </li>
              <li>
                <Link to="/about" className='text-gray-400 hover:text-white'>About Us</Link>
              </li>
              <li>
                <Link to="/contact" className='text-gray-400 hover:text-white'>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='flex flex-col items-center md:items-start'>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <ul className='flex space-x-4'>
              <li>
                <a href='https://github.com/vaibhavbarala26' target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>GitHub</a>
              </li>
              <li>
                <a href='https://twitter.com' target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>Twitter</a>
              </li>
              <li>
                <a href='https://www.linkedin.com/in/vaibhav-barala-b4a73b255/' target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white'>LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copy Section */}
        <div className='mt-8 text-center text-gray-500'>
          &copy; {new Date().getFullYear()} Restaurant Reviews. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
