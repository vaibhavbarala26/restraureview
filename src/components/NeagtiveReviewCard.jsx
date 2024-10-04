import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';

const NeagtiveReviewCard = ({ reviews }) => {
  const [likeColor, setLikeColor] = useState("#000000");
  const [dislikeColor, setDislikeColor] = useState("#000000");
  const [likes, setLikes] = useState(reviews.likes || 0);
  const [dislikes, setDislikes] = useState(reviews.disliked || 0);
  const { id } = useParams();
  const { user } = useClerk(); // Get the user from Clerk

  // Format date and time
  const formattedDate = moment(reviews.date).format('DD/MM/YYYY');
  const formattedTime = moment(reviews.date).format('hh:mm:ss A');

  const handleLikeDislike = async (response) => {
    const email = user.primaryEmailAddress.emailAddress; // Get the email of the current user
    try {
      const res = await fetch("https://restraureviewserver-klh4.vercel.app/like", {
        method: "PUT",
        body: JSON.stringify({ id, response, review_id: reviews._id, email: email }),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.review.likes);
        setDislikes(data.review.disliked);
    
      }
    } catch (error) {
      console.error("Error in like/dislike event:", error);
    }
  };

  useEffect(() => {
    // Check if the current user has already liked or disliked the review
    setLikes(reviews.likes);
    setDislikes(reviews.disliked);
  }, [reviews]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white mb-4 transition-transform transform hover:scale-105">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
          <span className="text-white font-bold">{reviews.user_name.charAt(0)}</span>
        </div>
        <span className="text-lg font-semibold">{reviews.user_name}</span>
      </div>

      <p className="text-gray-700">{reviews.review_text}</p>

      <div className="flex flex-row gap-2 mt-2">
        {renderStars(reviews.stars)}
      </div>

      <div className='flex flex-row gap-4 mt-2'>
        <span className='text-xs text-gray-500'>Date: {formattedDate}</span>
        <span className='text-xs text-gray-500'>Time: {formattedTime}</span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleLikeDislike("like")}
            className="flex items-center"
            style={{ color: likeColor }}
          >
            <span className="mr-1">👍</span> Like
          </button>
          <button
            onClick={() => handleLikeDislike("dislike")}
            className="flex items-center"
            style={{ color: dislikeColor }}
          >
            <span className="mr-1">👎</span> Dislike
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Likes: {likes}</span>
          <span className="text-gray-600">Dislikes: {dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default NeagtiveReviewCard;
