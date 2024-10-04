import React from 'react';
import { Link } from 'react-router-dom';
import baha from '../assets/bahamas.jpeg'; // Default image
import add from '../assets/address.svg'; // Optional address icon

const NewRestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/newrestaurant/${restaurant._id}`}>
      <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        {/* Restaurant Image */}
        {restaurant.photo ? (
          <img
            src={baha} 
            alt={restaurant.name}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="h-56 w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Restaurant Info */}
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">{restaurant.name}</h1>
          


          <div className="text-gray-600 flex items-center mb-1">
            <img src={add} alt="Location" className="h-5 w-5 mr-2" />
            <span>Latitude: {restaurant.latitude || 'N/A'}</span>
          </div>
          <div className="text-gray-600 flex items-center">
            <img src={add} alt="Location" className="h-5 w-5 mr-2" />
            <span>Longitude: {restaurant.longitude || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewRestaurantCard;
