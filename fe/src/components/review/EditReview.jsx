import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import { getReviewById, updateReview } from '../utils/ApiFunctions'


const EditReview = () => {
    const [review, setReview] = useState({
        comment: "",
        rating: "",
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { reviewId } = useParams()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setReview({ ...review, [name]: value })
    }

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const reviewData = await getReviewById(reviewId)
                setReview(reviewData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchReview()
    }, [reviewId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateReview(reviewId, review)
            if (response !== undefined) {
                setSuccessMessage("Review updated successfully!")
                const updatedReviewData = await getReviewById(reviewId)
                setReview(updatedReviewData)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating review")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <>
        <Sidebar>
            <div className="admin-container">
            <div className="container mt-5 mb-5">
                <h3 className="text-center mb-5 mt-5">Edit Review</h3>
                <div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						{successMessage && (
							<div className="alert alert-success" role="alert">
								{successMessage}
							</div>
						)}
						{errorMessage && (
							<div className="alert alert-danger" role="alert">
								{errorMessage}
							</div>
						)}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="comment">Comment</label>
                                <input type="text" className="form-control" id="comment" name="comment" value={review.comment} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <input type="text" className="form-control" id="rating" name="rating" value={review.rating} onChange={handleInputChange} />
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-review"} className="btn btn-outline-info ml-5">
									back
								</Link>
                                <button type="submit" className="btn btn-outline-warning">Update Review</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </Sidebar>
        </>
    )
}

export default EditReview