// import React, { useState } from 'react'
// import { FaStar } from 'react-icons/fa'


// const StarRate = () => {
//     const [rating, setRating] = useState(null)
//     const[rateColor, setRateColor] = useState(null)
//     return (
//         <>
//             {[...Array(5)].map((star, index) => {
//                 const currentRating = index + 1
//                 return(
//                     <>
//                         <label htmlFor="">
//                             <input type="radio" name="rating" value={currentRating}
//                             onClick={() => {setRating(currentRating)}}
//                             />
                            
//                             <FaStar size={40}
//                             color={currentRating <= rating ? "yellow" : "grey"}
//                             />
//                         </label>
//                     </>
                    
//                 )
//             })}
//         </>
//     )
// }

// export default StarRate