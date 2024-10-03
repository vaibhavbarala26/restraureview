import React from 'react'

const Whatwedo = () => {
  return (
    <div className='px-4 md:px-8'>
      {/* Section Container */}
      <div className='bg-gray-100 shadow-md p-6 mt-8 rounded-lg flex flex-col items-center'>
        {/* Section Title */}
        <h1 className='text-3xl md:text-5xl font-bold mb-8 text-center'>What We Do</h1>
        
        {/* Cards Container */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          
          {/* Card 1 */}
          <div className='flex flex-col bg-white text-center p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Discover Amazing Restaurants</h2>
            <p className='text-gray-700'>
              We connect food lovers with the best dining spots in their area. Whether you’re craving a quick bite or planning a special night out, our platform helps you explore top-rated restaurants based on real reviews and ratings.
            </p>
          </div>

          {/* Card 2 */}
          <div className='flex flex-col bg-white text-center p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Personalized Recommendations</h2>
            <p className='text-gray-700'>
              We help you find places that match your tastes. Using location data and reviews tailored to your preferences, we make it easy to discover your next favorite restaurant.
            </p>
          </div>

          {/* Card 3 */}
          <div className='flex flex-col bg-white text-center p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Real-Time Location-Based Search</h2>
            <p className='text-gray-700'>
              Allow location access and instantly see the best-rated restaurants around you. Whether you're in your hometown or exploring a new city, finding great food nearby has never been easier.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Whatwedo
