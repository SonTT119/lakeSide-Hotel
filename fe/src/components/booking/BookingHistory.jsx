import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getBookingsByUserId } from '../utils/ApiFunctions'

const BookingHistory = () => {
    const [bookings, setBookings] = useState([])

    const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

    useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}
		fetchBookings()
	}, [userId, token])

    const calculateTotalPrice = (checkInDate, checkOutDate, roomPrice) => {
        const days = moment(checkOutDate).diff(moment(checkInDate), 'days');
        return days * roomPrice;
    }

    return (
        <div className="container">
        <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
            <h4 className="card-title text-center mt-5">Booking History</h4>

            {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                    <thead>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Room price</th>
                            <th scope="col">Check In Date</th>
                            <th scope="col">Check Out Date</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Confirmation Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{booking.room.roomType}</td>
                                    <td>{booking.room.roomPrice.toLocaleString()} VND/night</td>
                                    <td>
                                        {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                                    </td>
                                    <td>
                                        {moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                                    </td>
                                    <td>{calculateTotalPrice(booking.checkInDate, booking.checkOutDate, booking.room.roomPrice).toLocaleString()} VND</td>
                                    <td>{booking.bookingConfirmationCode}</td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>You have not made any bookings yet.</p>
            )}
        </div>
        </div>
    )
}

export default BookingHistory