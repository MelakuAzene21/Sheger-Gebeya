import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewsDetail = ({ productId }) => {  // Accept productId as a prop
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL =
        process.env.NODE_ENV === 'production'
            ? 'https://e-market-fnu1.onrender.com' // Production URL
            : process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Local development URL

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products/${productId}/reviews`, {
                    withCredentials: true
                });
                setReviews(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch reviews');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    // Star rating component to display stars
    const StarRating = ({ ratingValue }) => {
        const stars = Array(5).fill(0); // Array of 5 stars

        return (
            <div className="flex space-x-2">
                {stars.map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={`cursor-pointer text-2xl ${starValue <= ratingValue ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                    );
                })}
            </div>
        );
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-500 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-white">No reviews yet.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                        <div className="items-center">
                            <p><span className="font-semibold">{review.name}</span></p>
                            <StarRating ratingValue={review.rating} />
                            <p className="ml-4 text-gray-950 font-semibold">{review.comment}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewsDetail;
