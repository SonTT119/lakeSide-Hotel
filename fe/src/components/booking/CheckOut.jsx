import React, { useEffect, useState } from 'react'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
// import Review from '../review/Review'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import SimilarRooms from '../common/SimilarRooms'
import Footer from '../layout/Footer'
import RoomReview from '../review/RoomReview'
import { getRoomById } from '../utils/ApiFunctions'
import BookingForm from './BookingForm'

const CheckOut = () => {
    const[error, setError] = useState("")
    const[isLoaded, setIsLoaded] = useState(true)
    const[roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice: "", maxAdults: "", maxChildren: ""})

    const {roomId} = useParams()
    useEffect(() => {
            getRoomById(roomId).then((response) =>{
                setRoomInfo(response)
                setIsLoaded(false)
            }).catch((error) => {
                setError(error)
                setIsLoaded(false)
            
            })
        
        // console.log("Room ID changed:", roomId);
    }, [roomId])

    const{user} = useContext(AuthContext)

    const isLoggedIn = user !== null

    return (
        <div>
            {isLoggedIn ?(
                <div>
                    <section  className='container room-similar' style={{backgroundColor:"whitesmoke", padding:"10px"}}>
                        <div className='row flex-column flex-md-row align-items-center mt-5'>
                            <div className='col'>
                                {isLoaded ? (
                                    <p>Loading room information</p>
                                ): error ? (
                                    <p>{error}</p>
                                ): (
                                    <div className='room-info'>
                                        <img src={`data:image/png;base64, ${roomInfo.photo}`} alt="Room photo" style={{width:"100%", height: "200px", marginTop:"15px"}}/>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr>
                                                    <th>Room Type:</th>
                                                    <th>{roomInfo.roomType}</th>
                                                </tr>
                                                <tr>
                                                    <th>Price per night:</th>
                                                    <th>{roomInfo.roomPrice.toLocaleString()} VND / night</th>
                                                </tr>
                                                <tr>
                                                    <th>Max Adults:</th>
                                                    <th>{roomInfo.maxAdults}</th>
                                                </tr>
                                                <tr>
                                                    <th>Max Children:</th>
                                                    <th>{roomInfo.maxChildren}</th>
                                                </tr>
                                                <tr>
                                                    <th>Room Service</th>
                                                    <td>
                                                        <ul className='list-unstyled'>
                                                            <li>
                                                                <FaWifi/> Free Wifi
                                                            </li>
                                                            <li>
                                                                <FaTv/> Netflix Premium
                                                            </li>
                                                            <li>
                                                                <FaUtensils/> Breakfast
                                                            </li>
                                                            <li>
                                                                <FaWineGlassAlt/> Mini Bar
                                                            </li>
                                                            <li>
                                                                <FaCar/> Car Service
                                                            </li>
                                                            <li>
                                                                <FaParking/> Parking
                                                            </li>
                                                            <li>
                                                                <FaTshirt/> Laundry
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className='col-md-8'>
                                <BookingForm/>
                            </div>
                            
                        </div>
                </section>
                    <div className='container'>
                        {/* <Review id={roomId}/> */}
                        {/* <Review/> */}
                        {/* <AddReview/> */}
                        {/* <RoomReview roomId={roomId}/> */}
                        <RoomReview/>
                        {roomInfo.roomType && <SimilarRooms roomInfo={roomInfo.roomType} />}
                    </div>
                    <Footer/>
            </div>
            
            ):(
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <h2 className="mt-5 mb-2">You are not authorized to view this page. Please log in !!!</h2>
                            <div>
                                <Link to={"/"} className="btn btn-outline-warning" style={{marginRight: "5px"}}>Back to Home</Link>
                                <Link to={"/login"} className="btn btn-outline-info">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckOut