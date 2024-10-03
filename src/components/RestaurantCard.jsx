import React from 'react'
import add from "../assets/address.svg"
import { Link } from 'react-router-dom';
import baha from "../assets/bahamas.jpeg"
// Custom Ico
const RestaurantCard = ({ restaurant }) => {
  console.log(restaurant);

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
    <div className='border-2 font-semibold rounded-xl py-4 px-4'>
      {/* Handle missing image gracefully */}
      {restaurant.photo ? (
        <img src={baha} alt={restaurant.name} className='h-56 w-96 object-cover rounded-md' />
      ) : (
        <div className="h-56 w-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      <h1 className='px-2 font-semibold'>Name: {restaurant.name}</h1>

      <div className='flex flex-row items-center'>
        <span className='px-2'>RevieScore:</span>
        <h1 className='ml-2'>{restaurant.reviewScore}</h1>
      </div>

      <h1 className='px-2 font-semibold'>Latitude: {restaurant.latitude || 'N/A'}</h1>
      <h1 className='px-2 font-semibold'>Longitude: {restaurant.longitude || 'N/A'}</h1>
    </div>
    </Link>
  )
}

export default RestaurantCard;
