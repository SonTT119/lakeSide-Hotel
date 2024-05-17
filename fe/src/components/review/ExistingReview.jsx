import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import Sidebar from '../layout/Sidebar';
import { deleteReview, getAllReviews } from '../utils/ApiFunctions';

const ExistingReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);
  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const result = await getAllReviews();
      setReviews(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === '') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.roomType === selectedRoomType);
      setFilteredReviews(filtered);
    }
    setCurrentPage(1);
  }, [reviews, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (reviewId) => {
    try {
      const result = await deleteReview(reviewId);
      if (result === '') {
        setSuccessMessage(`Review No ${reviewId} deleted successfully`);
        fetchReviews();
      } else {
        console.error(`Error deleting review: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <>
    <Sidebar>
      <div className="admin-content">
        <section className='container' style={{ backgroundColor: 'whitesmoke' }}>
          {isLoggedIn && userRole === 'ROLE_ADMIN' ? (
            <div className="container">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {isLoading ? (
                <p>Loading existing reviews...</p>
              ) : (
                <>
                  <section className='container'>
                    <div className="justify-content-between">
                      <h2>Existing Reviews</h2>
                    </div>
                    <table className='table table-bordered table-hover'>
                      <thead>
                        <tr className='text-center'>
                          <th>Review ID</th>
                          <th>Room ID</th>
                          <th>Room Type</th>
                          <th>User</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentReviews.map((review) => (
                          <tr key={review.id} className='text-center'>
                            <td>{review.reviewId}</td>
                            <td>{review.roomId}</td>
                            <td>{review.roomType}</td>
                            <td>{review.user}</td>
                            <td>{review.comment.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}</td>
                            <td>{review.rating}</td>
                            <td className="gap-2">
                              <Link to={`/review/edit/${review.reviewId}`}>
                                <span className="btn btn-info btn-sm">
                                    <FaEye />
                                </span>
                                <span className="btn btn-warning btn-sm">
                                    <FaEdit />
                                </span>
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(review.reviewId)}
                              >
                                <FaTrashAlt />
                              </button>
                          </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePaginationClick(i + 1)}
                          className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>
          ) : (
            <div className="container mt-5">
              <div className="row justify-content-center">
                <div className='col-md-8 col-lg-6'>
                  <h2 className='mt-5 mb-2'>You are not authorized to view this page</h2>
                  <Link to={"/"} className="btn btn-outline-info">Back to Home</Link>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </Sidebar>
    </>
  );
};

export default ExistingReview;
