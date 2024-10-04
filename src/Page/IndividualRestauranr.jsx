import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ReviewCard from '../components/PositiveReviewCard';
import NeagtiveReviewCard from '../components/NeagtiveReviewCard';
import { useClerk } from '@clerk/clerk-react';
import { useParams, Link } from 'react-router-dom';
import map from "../assets/map.svg";
import Skeleton from 'react-loading-skeleton';  // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Optional: Include skeleton styles

const Individual = () => {
  const { user } = useClerk();
  const [rating, setRating] = useState(0); // State to store star rating
  const [reviewText, setReviewText] = useState(''); // State to store review text
  const [positiveReviews, setPositiveReviews] = useState([]);
  const [negativeReviews, setNegativeReviews] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null); // To store fetched restaurant data
  const { id } = useParams(); // Extract the ID from URL params
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1042/hotels?id=${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRestaurantData(data); // Assuming response is an array of restaurants
          
          // Categorize initial reviews
          const positive = [];
          const negative = [];
          data?.reviews?.forEach((rev) => {
            if (rev?.Type === 'positive' || rev?.Type === 'neutral') {
              positive.push(rev);
            } else if (rev?.Type === 'negative') {
              negative.push(rev);
            }
          });
          setPositiveReviews(positive);
          setNegativeReviews(negative);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1042/hotel-review', {
        method: 'POST',
        body: JSON.stringify({
          id,
          review_text: reviewText,
          stars: rating,
          email: user.primaryEmailAddress.emailAddress
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newReview = data.reviews[data.reviews.length - 1]; // Get the latest review added
        if (newReview?.Type === 'positive' || newReview?.Type === 'neutral') {
          setPositiveReviews((prev) => [...prev, newReview]); // Update positive reviews
        } else if (newReview?.Type === 'negative') {
          setNegativeReviews((prev) => [...prev, newReview]); // Update negative reviews
        }

        // Clear the form after submission
        setReviewText('');
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!restaurantData) {
    // Skeletons for loading state
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="py-6 px-4 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 md:gap-6">
          <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
            <Skeleton height={200} />
            <Skeleton count={3} />
          </div>
          <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
            <Skeleton height={30} width={200} />
            <Skeleton count={4} />
          </div>
          <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
            <Skeleton height={30} width={200} />
            <Skeleton count={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="py-6 px-4 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 md:gap-6">
        {/* Left Column: Restaurant Info */}
        <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
          <div>
            <Link to={restaurantData?.photo} onClick={(e) => {
              e.preventDefault();
              openInNewTab(restaurantData?.photo);
            }} className="rounded-lg">
              <img src={map} alt="" className="h-10" /> 
              Link to Google Map
            </Link>
          </div> 
          <h1 className="text-2xl font-bold text-gray-800">
            {restaurantData ? `Name: ${restaurantData?.name}` : <Skeleton width={150} />}
          </h1>
          <h1 className="text-xl text-gray-700">
            {restaurantData ? `Review Score: ${restaurantData?.reviewScore}` : <Skeleton width={100} />}
          </h1>
          <div className="flex flex-row items-center">
            <h1 className="text-lg text-gray-600">
              {restaurantData ? `Address: ${restaurantData?.full_address}` : <Skeleton width={200} />}
            </h1>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Write a Review:</h1>
            <textarea
              className="mt-2 border-2 border-gray-300 rounded-lg p-2"
              cols={30}
              rows={5}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts..."
            />
            <div className="mt-2">
              <h1 className="text-xl font-semibold">Rating:</h1>
              <div className="flex flex-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-black text-white rounded-full py-2 px-4 mt-2 hover:bg-gray-800">
              Submit
            </button>
          </form>
        </div>

        {/* Middle Column: Positive Reviews */}
        <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md mt-4 md:mt-0">
          <h1 className="text-2xl font-bold">Positive Reviews</h1>
          {positiveReviews?.length ? (
            positiveReviews.map((pos, index) => <ReviewCard key={index} reviews={pos} />)
          ) : (
            <Skeleton count={3} />
          )}
        </div>

        {/* Right Column: Negative Reviews */}
        <div className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md mt-3 md:mt-0">
          <h1 className="text-2xl font-bold">Negative Reviews</h1>
          {negativeReviews?.length ? (
            negativeReviews.map((neg, index) => <NeagtiveReviewCard key={index} reviews={neg} />)
          ) : (
            <Skeleton count={3} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Individual;
