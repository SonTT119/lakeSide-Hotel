import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"
import Footer from "../layout/Footer"

const BookingSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error

	
	return (
		<div className="container">
			<Header title="Booking Success" />
			<div className="mt-5">
				{message ? (
					<div>
						<h3 className="text-success"> Booking Success!</h3>
						<p className="text-success">{message}</p>
					</div>
				) : (
					<div>
						<h3 className="text-danger"> Error Booking Room!</h3>
						<p className="text-danger">"This room is not available at the moment, please choose another time period."</p>
						<p>To ensure that the room you choose during this period is always available, please check if the room is available or not by searching on the home page.</p>
						<Link to="/" className='payment-button'>Return to Home</Link>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default BookingSuccess