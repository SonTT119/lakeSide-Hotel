import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { addReviews, getAllReviewsByRoomId } from '../utils/ApiFunctions';
import './ReviewSection.css'; // Import your CSS file

const ReviewSection = () => {
    const [review, setReview] = useState({ comment: "", rating: 0 });
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddReview, setShowAddReview] = useState(false);
    const reviewsPerPage = 5;
    const { roomId } = useParams();
    const { user } = useContext(AuthContext);
    const isLoggedIn = user !== null;

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const result = await getAllReviewsByRoomId(roomId);
            setReviews(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const handleReviewInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setErrorMessage("Please login to add a review");
            return;
        }
        try {
            const success = await addReviews(roomId, review.comment, review.rating);
            if (success !== undefined) {
                setSuccessMessage("A new review added successfully");
                setErrorMessage("");
                setReview({ comment: "", rating: 0 });
                fetchReviews();
            } else {
                setErrorMessage("Failed to add a new review");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const handleStarClick = (rating) => {
        setReview({ ...review, rating: rating });
    };

    return (
        <section id='reviews' className="bg-light mb-5 mt-5 shadow">
        <div className="room-similar">
            <h2 className=''>Room Ratings</h2>
            <div className='review-section-container'>
                <div className='review-section-header'>
                    <button onClick={() => setShowAddReview(false)} className='buttonn'>Reviews</button>
                    <button onClick={() => setShowAddReview(true)} className='buttonn'>Add Review</button>
                </div>
                {showAddReview ? (
                    <div className="add-review-form">
                        <h2>Add Review</h2>
                        <form onSubmit={handleSubmit} className=''>
                        <div className='form-group'>
                            
                            <div className='comment-rating-container'>
                                <label htmlFor='rating'>Rating</label>
                                <div className='star-rating'>
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            className={ratingValue <= review.rating ? 'star filled' : 'star'}
                                            onClick={() => handleStarClick(ratingValue)}
                                            color={ratingValue <= review.rating ? '#ffc107' : '#000'}
                                        />
                                    );
                                })}
                                </div>
                            </div>
                            <div className='comment-rating-container'>
                                <label htmlFor='comment'>Comment</label>
                                <textarea className='form-control' id='comment' name='comment' value={review.comment} onChange={handleReviewInputChange} required rows={5} />
                            </div>
                        </div>

                            <button type='submit' className='btn btn-primary'>Add Review</button>
                        </form>
                        {successMessage && <div className='alert alert-success mt-3'>{successMessage}</div>}
                        {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
                    </div>
                ) : (
                    <div className="review-list">
                        <h2>Reviews</h2>
                        {isLoading ? (
                            <p>Loading reviews...</p>
                        ) : errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : reviews.length === 0 ? (
                            <p>No reviews available</p>
                        ) : (
                            reviews
                                .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
                                .map((review) => (
                                    <div key={review.id} className="review-card">
                                        <div className="review-card-body">
                                            <img src={review.avatar || "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"} alt="Avatar" className="review-avatar" />
                                            <div>
                                                <div className="review-user">{review.user}</div>
                                                <div className="review-rating">
                                                {[...Array(5)].map((_, index) => {
                                                    const ratingValue = index + 1;
                                                    return (
                                                        <FaStar
                                                            key={index}
                                                            // className={ratingValue <= review.rating ? 'star filled' : 'star'}
                                                            color={ratingValue <= review.rating ? '#ffc107' : '#000'}
                                                        />
                                                    );
                                                })}
                                                </div>
                                                <div className="review-comment">{review.comment.split('\n').map((line, index) => <div key={index}>{line}</div>)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    className="page-link"
                                    onClick={() => setCurrentPage(number)}
                                    style={{ backgroundColor: number === currentPage ? '#007bff' : '' }}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </section>
    );
};

export default ReviewSection;
