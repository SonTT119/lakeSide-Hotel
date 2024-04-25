import React, { useEffect, useState } from 'react'
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import RoomCarousel from '../common/RoomCarousel'
import AddReview from '../review/AddReview'
// import Review from '../review/Review'
import { getRoomById } from '../utils/ApiFunctions'
import BookingForm from './BookingForm'

const CheckOut = () => {
    const[error, setError] = useState("")
    const[isLoaded, setIsLoaded] = useState(true)
    const[roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice: ""})

    const {roomId} = useParams()
    useEffect(() => {
        setTimeout(()=>{
            getRoomById(roomId).then((response) =>{
                setRoomInfo(response)
                setIsLoaded(false)
            }).catch((error) => {
                setError(error)
                setIsLoaded(false)
            
            })
        }, 2000)
    }, [roomId])
    return (
        <div>
            <section  className='container' style={{backgroundColor:"whitesmoke", padding:"10px"}}>
                <div className='row flex-column flex-md-row align-items-center mt-5'>
                    <div className='col'>
                        {isLoaded ? (
                            <p>Loading room information</p>
                        ): error ? (
                            <p>{error}</p>
                        ): (
                            <div className='room-info'>
                                <img src={`data:image/png;base64, ${roomInfo.photo}`} alt="Room photo" style={{width:"100%", height: "200px"}}/>
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
                <AddReview/>
                <RoomCarousel/>
            </div>
        </div>
    )
}

export default CheckOut