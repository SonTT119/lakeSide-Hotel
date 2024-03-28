// import React, { useEffect, useState } from 'react'
// import Header from '../common/Header'
// import { getAllReviews } from '../utils/ApiFunctions'
// import ReviewTable from './ReviewTable'


// const Review = () => {
//     const[review, setReview] = useState([{id: "", comment: "", rating: "", user: {id: "", email: "", firstName: "", lastName: ""}}])
//     const[isLoading, setIsLoading] = useState(false)
//     const[errorMessage, setErrorMessage] = useState("")
//     const[successMessage, setSuccessMessage] = useState("")
//     const[currentPage, setCurrentPage] = useState(1)
//     const[reviewsPerPage, setReviewsPerPage] = useState(8)

//     useEffect(() => {
//         fetchReviews()
//     },[])

//     const fetchReviews = async () =>{
//         setIsLoading(true)
//         try {
//             const result = await getAllReviews()
//             setReview(result)
//             setIsLoading(false)
//         } catch (error) {
//             setErrorMessage(error.message)
//             setIsLoading(false)
//         }
//     }

//     const handlePaginationClick = (pageNumber) => {
//         setCurrentPage(pageNumber)
//     }

//     const calculateTotalPages = () => {
//         return Math.ceil(review.length / reviewsPerPage)
//     }

//     return (
//         <div>
//             <section className='container'>
//                 <Header title={"Existing Reviews"}/>
//                 {errorMessage && (<div className='text-danger'>{errorMessage}</div>)}
//                 {isLoading ? (<div>Loading Existing Reviews </div>):(
//                     <ReviewTable review={review}
//                     handlePaginationClick={handlePaginationClick}
//                     calculateTotalPages={calculateTotalPages} />
//                 )}
//             </section>
//         </div>
//     )

// }

// export default Review