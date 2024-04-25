import React, { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestFullName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	})

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		room: { id: "", roomType: "" },
		roomNumber: "",
		checkInDate: "",
		checkOutDate: "",
		guestFullName: "",
		guestEmail: "",
		numOfAdults: "",
		numOfChildren: "",
		totalNumOfGuests: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const{user} = useContext(AuthContext)

	const isLoggedIn = user !== null
	const userRole = localStorage.getItem("userRole")


	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getBookingByConfirmationCode(confirmationCode)
			setBookingInfo(formattedBookingInfo(data))
			setError(null)
		} catch (error) {
			setBookingInfo(emptyBookingInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const handleBookingCancellationByAdmin = async (bookingId) => {
		try {
			await cancelBooking(bookingInfo.id)
			setIsDeleted(true)
			setSuccessMessage("Booking has been cancelled successfully!")
			setBookingInfo(emptyBookingInfo)
			setConfirmationCode("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	const handleBookingCancellationByUser = async (bookingID) => {
		const confirmed = window.confirm(
			"Are you sure you want to cancel your booking? This action cannot be undone."
		);
	
		if (confirmed) {
			try {
				// Lấy thông tin đặt chỗ từ API
				const bookingData = await getBookingByConfirmationCode(confirmationCode);
	
				// Lấy thời gian hiện tại
				const currentTime = new Date().getTime();
	
				// Chuyển đổi thời gian check-in của đặt chỗ thành timestamp
				const checkInTime = new Date(bookingData.checkInDate).getTime();
	
				// So sánh thời gian check-in với thời gian hiện tại
				if (checkInTime > currentTime) {
					// Nếu thời gian check-in vẫn chưa đến, cho phép hủy đặt chỗ
					await cancelBooking(bookingID);
					setSuccessMessage("Booking has been cancelled successfully!");
					setBookingInfo(null);
					setConfirmationCode("");
					setError("");
				} else {
					// Nếu thời gian check-in đã qua, hiển thị thông báo lỗi
					setError("You cannot cancel your booking because the check-in time has already passed.");
				}
			} catch (error) {
				setError("An error occurred while cancelling the booking.");
			}
		}
	};
	

	const formattedBookingInfo = (data) => {
		if (!data) return emptyBookingInfo

		return {
			...data,
			checkInDate: new Date(data.checkInDate).toLocaleDateString(),
			checkOutDate: new Date(data.checkOutDate).toLocaleDateString()
		}
	}

	return (
		<section className="container"  style={{backgroundColor:"whitesmoke"}} >
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Find My Booking</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your booking...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
				<div className="booking-info">
						<div className="col-md-6 mt mb-2">
						<h4>Booking Information</h4>
                        <hr />

						<p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <hr />
						<p>Room Number: {bookingInfo.room.id}</p>
						<p>Room Type: {bookingInfo.room.roomType}</p>
						<p>Check-In Date:  {bookingInfo.checkInDate}</p>
                        <p>Check-Out Date: {bookingInfo.checkOutDate}</p>
						<p>Full Name: {bookingInfo.guestFullName}</p>
						<p>Email Address: {bookingInfo.guestEmail}</p>
						<p>Adults: {bookingInfo.numOfAdults}</p>
						<p>Children: {bookingInfo.numOfChildren}</p>
						<p>Total Guest: {bookingInfo.totalNumOfGuests}</p>
						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							!isDeleted && (
							<button
								onClick={() => handleBookingCancellationByAdmin(bookingInfo.id)}
								className="btn btn-danger">
								Cancel Booking
							</button>
							)
						)}

						{isLoggedIn && userRole === "ROLE_USER" && (
							<button
								onClick={() => handleBookingCancellationByUser(bookingInfo.id)}
								className="btn btn-danger">
								Cancel Booking
							</button>
						)}
					</div>
				</div>
				) : (
					<div>find booking...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</section>
	)
}

export default FindBooking