import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Skeleton from 'react-loading-skeleton';  // Import Skeleton for loading state
import 'react-loading-skeleton/dist/skeleton.css'; // Optional: Include skeleton styles
import "../App.css";

const LocationGranted = ({ nearbyHotels, loading }) => {  // Add loading as a prop
  return (
    <div className='w-full max-w-4xl mx-auto p-4 '>
      {/* Title Section */}
      <div className='text-center'>
        <h1 className='font-bold text-3xl py-3'>Top Restaurants in Your Area</h1>
      </div>

      {/* Restaurant List Section */}
      <div className='flex flex-col gap-6 py-8  h-[calc(100vh-200px)]'>
        {loading ? (
          // Display skeletons while data is loading
          Array(5).fill().map((_, index) => (
            <Skeleton key={index} height={150} />
          ))
        ) : (
          // Render nearby hotels fetched from the server
          nearbyHotels.length > 0 ? (
            nearbyHotels.map((res) => (
              <RestaurantCard key={res?._id} restaurant={res} />
            ))
          ) : (
            <p>No nearby restaurants found</p>
          )
        )}
      </div>
    </div>
  );
};

export default LocationGranted;
