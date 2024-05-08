// import React, { useEffect, useState } from 'react';
// import { FaRegStar, FaStar } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';

// const ReviewRoom = () => {
//     const [reviewData, setReviewData] = useState({ email: '', review: '', rating: '' });
//     const { roomId } = useParams();

//     useEffect(() => {
//         getAllReviewsByRoomId(roomId).then((response) => {
//             setReviewData(response);
//         });
//     }, [roomId]);

//     const renderStars = (rating) => {
//         const stars = [];
//         const maxStars = 5;
//         const roundedRating = Math.round(reviewData.rating);

//         for (let i = 0; i < maxStars; i++) {
//             if (i < roundedRating) {
//                 stars.push(<FaStar key={i} className='color-star' />); // Sao đầy
//             } else {
//                 stars.push(<FaRegStar key={i} className='star'/>); // Sao trắng
//             }
//         }

//         return stars;
//     };
    
//     return (
//         <div>
//             <h2>ReviewRoom</h2>
//             <div>Email: {reviewData.email}</div>
//             <div>Review: {reviewData.review}</div>
//             <div>Rating: {renderStars()}</div>
//         </div>
//     );
// };

// export default ReviewRoom;
