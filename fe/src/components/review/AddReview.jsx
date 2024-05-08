// import React, { useContext, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AuthContext } from '../auth/AuthProvider'
// import { addReviews } from '../utils/ApiFunctions'


// const AddReview = () => {
//     const[review, setReview] = useState({comment: "", rating: ""})
//     const[successMessage, setSuccessMessage] = useState("")
//     const[errorMessage, setErrorMessage] = useState("")
//     const {roomId} = useParams()
//     const{user} = useContext(AuthContext)

//     const isLoggedIn = user !== null

//     const handleReviewInputChange = (e) => {
//         const name = e.target.name
//         const value = e.target.value
//         setReview({...review, [name]: value})
//     }

//     const handleSubmit = async(e) =>{
//         e.preventDefault()
//         if(!isLoggedIn){
//             setErrorMessage("Please login to add a review")
//             return
//         }
//         try {
//             const success = await addReviews(roomId, review.comment, review.rating)
//             if(success !== undefined){
//                 setSuccessMessage("A new review added successfully")
//                 setErrorMessage("")
//                 setReview({comment: "", rating: ""})
//             }else{
//                 setErrorMessage("Failed to add a new review")
//             }
//         } catch (error) {
//             setErrorMessage(error.message)
//         }
//         setTimeout(() => {
//             setSuccessMessage("")
//             setErrorMessage("")
//         }, 3000)
//     }

//     return (
//         <div>
//             <section id='reviews' className='container'>
//                 <div className='row flex-column flex-md-row align-items-center'>
//                     <div className='col-md-4 mt-5 mb-5'>
//                         <h2>Add Review</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className='form-group'>
//                                 <label htmlFor='comment'>Comment</label>
//                                 <input type='text' className='form-control' id='comment' name='comment' value={review.comment} onChange={handleReviewInputChange} required/>
//                             </div>
//                             <div className='form-group'>
//                                 <label htmlFor='rating'>Rating</label>
//                                 <input type='number' className='form-control' id='rating' name='rating' value={review.rating} onChange={handleReviewInputChange} required/>
//                             </div>
//                             <button type='submit' className='btn btn-primary'>Add Review</button>
//                         </form>
//                         {successMessage && <div className='alert alert-success mt-3'>{successMessage}</div>}
//                         {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default AddReview