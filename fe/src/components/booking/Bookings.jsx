import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import BookingTable from './BookingTable'

const Bookings = () => {
  const[bookingInfo, setBookingInfo] = useState([])
  const[isLoading, setIsLoading] = useState(false)
  const[error, setError] = useState("")

  useEffect(() =>{
    setTimeout(()=>{
      getAllBookings().then((data) =>{
        setBookingInfo(data)
        setIsLoading(false)
      }).catch((error) =>{
        setError(error.message)
        setIsLoading(false)
      })
    }, 2000)
  }, [])

  const handleBookingCancellation = async(bookingId) => {
    try {
      await cancelBooking(bookingId)
      const data = await getAllBookings()
      setBookingInfo(data)
      
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className='container' style={{backgroundColor:"whitesmoke"}}>
      <Header title={"Existing Bookings"}/>
      {error && (<div className='text-danger'>{error}</div>)}
      {isLoading ? (<div>Loading Existing Booking </div>):(
        <BookingTable bookingInfo={bookingInfo}
        handleBookingCancellation={handleBookingCancellation} />
      )}
    </section>
  )
}

export default Bookings