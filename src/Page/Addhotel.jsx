import React, { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import Header from '../components/Header';

const AddRestaurantForm = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [full_address, setFullAddress] = useState("");
  const [photo, setPhoto] = useState("");  // Missing state for photo URL
  const { user } = useClerk();
  const [ratings, setRating] = useState(0);
  const [review_text, setReviewText] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "latitude":
        setLatitude(value);
        break;
      case "longitude":
        setLongitude(value);
        break;
      case "full_address":
        setFullAddress(value);
        break;
      case "photo":
        setPhoto(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create restaurant object including review and ratings
    const restaurantWithReview = {
      name,
      latitude,
      longitude,
      full_address,
      photo,
      review_text,
      ratings,
      email: user?.primaryEmailAddress?.emailAddress // Clerk user email
    };

    try {
      const response = await fetch('http://localhost:1042/add-hotel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantWithReview),
        credentials:"include"
      });

      if (!response.ok) {
        throw new Error('Error adding restaurant');
      }

      const result = await response.json();
      alert('Restaurant added successfully!');
      // Reset restaurant form after successful submission
      setName("");
      setLatitude(0);
      setLongitude(0);
      setFullAddress("");
      setPhoto("");
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header></Header>
  <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
    
    <h2 className="text-2xl font-bold mb-6 text-center">Add New Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={latitude}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter latitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={longitude}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter longitude"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Address</label>
          <input
            type="text"
            name="full_address"
            value={full_address}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter full address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Google maps URL</label>
          <input
            type="text"
            name="photo"
            value={photo}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter photo URL"
          />
        </div>

        {/* Review Section */}
        <h3 className="text-xl font-bold">Add a Review</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">Review Text</label>
          <textarea
            name="review_text"
            value={review_text}
            onChange={(e) => setReviewText(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your review"
            required
          />
        </div>

        <div className="mt-2">
          <h1 className="text-xl font-semibold">Rating:</h1>
          <div className="flex flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer ${ratings >= star ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-full w-full font-bold"
        >
          Add Restaurant
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddRestaurantForm;
