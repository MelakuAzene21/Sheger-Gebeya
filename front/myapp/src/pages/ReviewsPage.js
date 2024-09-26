import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    useGetReviewsQuery,
    usePostReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} from '../services/productsApi';
import { useGetCurrentUserQuery } from '../features/api/authApi';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Layout/Spinner';

const ReviewsPage = ({ productId }) => {
    const { id } = useParams(); // Get product ID from URL params
    const { currentUser } = useGetCurrentUserQuery(); // Fetch the current authenticated user
    const currentUserId = currentUser?._id;
    const name = currentUser?.name;
    // API hooks for reviews
    const { data: reviews, isLoading, error } = useGetReviewsQuery(id);
    const [postReview] = usePostReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    // State for review form inputs
    const [rating, setRating] = useState(0); // Default rating is 0
    const [hoverRating, setHoverRating] = useState(0); // For hover effect on stars
    const [comment, setComment] = useState('');

    // Clear form after successful review submission
    useEffect(() => {
        setRating(0); // Reset rating to 0 after submission
        setComment(''); // Clear comment
    }, [reviews]);

    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await postReview({ productId: id, rating, comment, user: currentUserId }).unwrap();
            toast.success('Review submitted!');
        } catch (err) {
            toast.error('Already you posted');
        }
    };

    // Handle review update
    const handleReviewUpdate = async (reviewId) => {
        if (!productId || !reviewId) {
            console.error("Product ID or Review ID is undefined");
            return;
        }
        try {
            await updateReview({ rating, comment }).unwrap();
            toast.success('Review updated!');
        } catch (err) {
            toast.error('Error updating review');
        }
    };

    // Handle review deletion
    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId).unwrap();
            toast.success('Review deleted!');
        } catch (err) {
            toast.error('Error deleting review');
        }
    };

    // Star rating component to display stars
    const StarRating = ({ ratingValue, setRating, setHoverRating, hoverRating }) => {
        const stars = Array(5).fill(0); // Array of 5 stars

        return (
            <div className="flex space-x-2">
                {stars.map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className={`cursor-pointer text-2xl ${starValue <= (hoverRating || ratingValue) ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => setRating(starValue)} // Set the rating on click
                            onMouseEnter={() => setHoverRating(starValue)} // Show hover effect
                            onMouseLeave={() => setHoverRating(0)} // Remove hover effect
                        />
                    );
                })}
            </div>
        );
    };

    if (isLoading) return <div><Spinner/></div>;
    if (error) return <div>Error loading reviews.</div>;

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-600">
            <h1 className="text-3xl  mb-6 italic font-serif font-bold">Reviews</h1>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-gray-900 font-mono  font-bold text-lg mb-2 ">Rating:</label>
                    <StarRating
                        ratingValue={rating}
                        setRating={setRating}
                        hoverRating={hoverRating}
                        setHoverRating={setHoverRating}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-900 font-sans font-bold text-lg mb-2">Comment:</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Submit Review
                </button>
            </form>

            {/* List of Reviews */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                {reviews?.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                            <div className=" items-center">
                                <p> <span className="font-semibold">{review.name}</span></p>
                                <StarRating
                                    ratingValue={review.rating}
                                    setRating={() => { }} // Read-only stars, no setRating
                                    hoverRating={0} // No hover effect for existing reviews
                                    setHoverRating={() => { }} // No hover effect for existing reviews
                                />
                                <br/>
                                <p className="ml-4 text-gray-900 font-bold">{review.comment}</p>
                               
                            </div>
                            {/* Show edit/delete buttons if current user is the review author */}
                            {review.user === currentUserId && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleReviewUpdate(review._id)}
                                        className="text-blue-500 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteReview(review._id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;

