import React, { useEffect, useState } from 'react';
import { restaurants } from '../data/restaurants';
import RestaurantCard from './RestaurantCard';
import "../App.css";

const LocationGranted = ({nearbyHotels}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  return (
    <div className='w-full max-w-4xl mx-auto p-4 '>
      {/* Title Section */}
      <div className='text-center'>
        <h1 className='font-bold text-3xl py-3'>Top Restaurants in Your Area</h1>
      </div>

      {/* Restaurant List Section */}
      <div className='flex flex-col gap-6 py-8  h-[calc(100vh-200px)]'>
        {/* Render nearby hotels fetched from the server */}
        {nearbyHotels.length > 0 ? (
          nearbyHotels.map((res) => (
            <RestaurantCard key={res?._id} restaurant={res} />
          ))
        ) : (
          <p>No nearby restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default LocationGranted;
