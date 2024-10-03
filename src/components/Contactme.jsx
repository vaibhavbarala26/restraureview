import React from 'react';

const ContactMe = () => {
  return (
    <div className='px-4 md:px-8'>
    <div className='px-4 md:px-8 py-12 mt-10 shadow-md bg-gray-100 rounded-lg'>
      {/* Section Title */}
      <h2 className='text-3xl md:text-5xl font-bold text-center mb-8'>Contact Us</h2>
      
      {/* Contact Form */}
      <form className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input 
              type='text' 
              id='name' 
              name='name' 
              className='mt-1 block w-full border border-gray-300 rounded-md p-2' 
              placeholder='Your Name'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              id='email' 
              name='email' 
              className='mt-1 block w-full border border-gray-300 rounded-md p-2' 
              placeholder='Your Email'
              required
            />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message</label>
          <textarea 
            id='message' 
            name='message' 
            rows='4' 
            className='mt-1 block w-full border border-gray-300 rounded-md p-2' 
            placeholder='Your Message'
            required
          ></textarea>
        </div>

        <button 
          type='submit' 
          className='bg-black text-white p-3 rounded-full w-full font-bold text-lg'>
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactMe;
