import React, { useEffect, useState } from 'react'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
// import Review from '../review/Review'
import SimilarRooms from '../common/SimilarRooms'
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
    return (
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
                                            <th>${roomInfo.roomPrice} / night</th>
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
        </div>
    )
}

export default CheckOut