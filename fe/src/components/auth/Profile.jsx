// import moment from "moment"
// import React, { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { getBookingsByUserId, getUser, updateAvatar } from "../utils/ApiFunctions"

// const Profile = () => {
// 	const [user, setUser] = useState({
// 		id: "",
// 		email: "",
// 		firstName: "",
// 		lastName: "",
// 		avatar: "",
// 		roles: [{ id: "", name: "" }]
// 	})

// 	const [bookings, setBookings] = useState([
// 		{
// 			id: "",
// 			room: { id: "", roomType: "" },
// 			checkInDate: "",
// 			checkOutDate: "",
// 			bookingConfirmationCode: ""
// 		}
// 	])

// 	const [avatar, setAvatar] = useState("")

// 	const [message, setMessage] = useState("")
// 	const [errorMessage, setErrorMessage] = useState("")
// 	const navigate = useNavigate()

// 	const userId = localStorage.getItem("userId")
// 	const token = localStorage.getItem("token")

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			try {
// 				const userData = await getUser(userId, token)
// 				setUser(userData)
// 				setAvatar(userData.avatar)
// 			} catch (error) {
// 				console.error(error)
// 			}
// 		}

// 		fetchUser()
// 	}, [userId])
	
// 	const handleAvatarChange = (e) => {
// 		const selectedAvatar = e.target.files[0]
// 		setUser({ ...user, avatar: selectedAvatar })
// 		setAvatar(URL.createObjectURL(selectedAvatar))
// 	}

// 	const handleSubmitAvatar = async (e) => {
// 		e.preventDefault()

// 		const formData = new FormData()
// 		formData.append("avatar", avatar)

// 		try {
// 			const response = await updateAvatar(user.id, formData, token)
// 			if (response !== undefined) {
// 				setMessage("Avatar updated successfully!")
// 				const updatedUserData = await getUser(userId, token)
// 				setAvatar(updatedUserData.avatar)
// 				setErrorMessage("")
// 			} else {
// 				setErrorMessage("Error updating avatar")
// 			}
// 		} catch (error) {
// 			console.error(error)
// 			setErrorMessage(error.message)
// 		}
// 	}

	

// 	useEffect(() => {
// 		const fetchBookings = async () => {
// 			try {
// 				const response = await getBookingsByUserId(userId, token)
// 				setBookings(response)
// 			} catch (error) {
// 				console.error("Error fetching bookings:", error.message)
// 				setErrorMessage(error.message)
// 			}
// 		}

// 		fetchBookings()
// 	}, [userId])

// 	// const handleDeleteAccount = async () => {
// 	// 	const confirmed = window.confirm(
// 	// 		"Are you sure you want to delete your account? This action cannot be undone."
// 	// 	)
// 	// 	if (confirmed) {
// 	// 		await deleteUser(userId)
// 	// 			.then((response) => {
// 	// 				setMessage(response.data)
// 	// 				localStorage.removeItem("token")
// 	// 				localStorage.removeItem("userId")
// 	// 				localStorage.removeItem("userRole")
// 	// 				navigate("/")
// 	// 				window.location.reload()
// 	// 			})
// 	// 			.catch((error) => {
// 	// 				setErrorMessage(error.data)
// 	// 			})
// 	// 	}
// 	// }

// 	// const handleStatus = (status) => {
// 	// 	if (status === "CANCELLED") {
// 	// 		return "Cancelled"
// 	// 	} else {
// 	// 		return "On-going"
// 	// 	}
// 	// }

// 	return (
// 		<div className="container">
// 			{errorMessage && <p className="text-danger">{errorMessage}</p>}
// 			{message && <p className="text-danger">{message}</p>}
// 			{user ? (
// 				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
// 					<h4 className="card-title text-center">User Information</h4>
// 					<div className="card-body">
// 						<div className="col-md-10 mx-auto">
// 							<div className="card mb-3 shadow">
// 								<div className="row g-0">
									
// 										<div className="col-md-2">
// 										<form onSubmit={handleSubmitAvatar}>
// 											<div className="d-flex justify-content-center align-items-center mb-4">
// 												<img
// 													src={user.avatar || "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"}
// 													alt="Profile"
// 													className="rounded-circle"
// 													style={{ width: "150px", height: "150px", objectFit: "cover" }}
// 												/>
												
										
// 											</div>
// 											<span>
// 												<input
// 													required
// 													type="file"
// 													className="form-control"
// 													id="avatar"
// 													name="avatar"
// 													onChange={handleAvatarChange}
// 												/>
// 												{avatar && (
// 													<img
// 													src={`data:image/jpeg;base64,${avatar}`}
// 													alt="Room preview"
// 													style={{ maxWidth: "400px", maxHeight: "400px" }}
// 													className="mt-3"
// 												/>
// 												)}
// 											</span>

// 											<button type="submit" className="btn btn-outline-primary mt-2">
// 												Update Avatar
// 											</button>
// 										</form>
// 										</div>
// 									<div className="col-md-10">
// 										<div className="card-body">
// 											{/* <div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">ID:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.id}</p>
// 												</div>
// 											</div> */}
// 											<hr />

// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.firstName}</p>
// 												</div>
// 											</div>
// 											<hr />

// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.lastName}</p>
// 												</div>
// 											</div>
// 											<hr />

// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">Email:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.email}</p>
// 												</div>
// 											</div>
// 											<hr />
// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">Phone:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.phone}</p>
// 												</div>
// 											</div>
// 											<hr />
// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">Address:</label>
// 												<div className="col-md-10">
// 													<p className="card-text">{user.address}</p>
// 												</div>
// 											</div>
// 											<hr />

// 											<div className="form-group row">
// 												<label className="col-md-2 col-form-label fw-bold">Roles:</label>
// 												<div className="col-md-10">
// 													<ul className="list-unstyled">
// 														{user.roles.map((role) => (
// 															<li key={role.id} className="card-text">
// 																{role.name}
// 															</li>
// 														))}
// 													</ul>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>

// 							<div className="d-grid gap-2 d-md-flex mt-2">
// 								<Link to="/edit-profile" className="btn btn-outline-warning">
// 									Edit Profile
// 								</Link>
// 								{/* <button className="btn btn-outline-danger" onClick={handleDeleteAccount}>
// 									Delete Account
// 								</button> */}
// 							</div>

// 							<h4 className="card-title text-center">Booking History</h4>

// 							{bookings.length > 0 ? (
// 								<table className="table table-bordered table-hover shadow">
// 									<thead>
// 										<tr>
// 											<th scope="col">Booking ID</th>
// 											<th scope="col">Room ID</th>
// 											<th scope="col">Room Type</th>
// 											<th scope="col">Check In Date</th>
// 											<th scope="col">Check Out Date</th>
// 											<th scope="col">Confirmation Code</th>
// 											<th scope="col">Status</th>
// 										</tr>
// 									</thead>
// 									<tbody>
// 										{bookings.map((booking, index) => (
// 											<tr key={index}>
// 												<td>{booking.id}</td>
// 												<td>{booking.room.id}</td>
// 												<td>{booking.room.roomType}</td>
// 												<td>
// 													{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
// 												</td>
// 												<td>
// 													{moment(booking.checkOutDate)
// 														.subtract(1, "month")
// 														.format("MMM Do, YYYY")}
// 												</td>
// 												<td>{booking.bookingConfirmationCode}</td>
// 												<td>{booking.status}</td>
// 											</tr>
// 										))}
// 									</tbody>
// 								</table>
// 							) : (
// 								<p>You have not made any bookings yet.</p>
// 							)}

							
// 						</div>
// 					</div>
// 				</div>
// 			) : (
// 				<p>Loading user data...</p>
// 			)}
// 		</div>
// 	)
// }

// export default Profile

import moment from "moment"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getBookingsByUserId, getUser, updateAvatar } from "../utils/ApiFunctions"

const Profile = () => {
	const [user, setUser] = useState({
				id: "",
				email: "",
				firstName: "",
				lastName: "",
				avatar: "",
				roles: [{ id: "", name: "" }]
			})
	const [bookings, setBookings] = useState([])
	const [avatar, setAvatar] = useState("")
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()
	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
				setAvatar(userData.avatar)
			} catch (error) {
				console.error("Error fetching user:", error)
			}
		}
		fetchUser()
	}, [userId, token])

	const handleAvatarChange = (e) => {
		const selectedAvatar = e.target.files[0];
		setUser({ ...user, avatar: selectedAvatar }); // Cập nhật trạng thái của user.avatar thành tệp hình đại diện
		setAvatar(URL.createObjectURL(selectedAvatar));
	}

	const handleSubmitAvatar = async (e) => {
		e.preventDefault();
		
		try {
			const avatarData = { avatar: user.avatar }
			const response = await updateAvatar(user.id, avatarData);
			if (response) {
				setMessage("Avatar updated successfully!");
				const updatedUserData = await getUser(userId, token);
				setUser(updatedUserData);
				setAvatar(updatedUserData.avatar);
				setErrorMessage("");
			} else {
				setErrorMessage("Error updating avatar");
			}
		} catch (error) {
			console.error("Error updating avatar:", error);
			setErrorMessage(error.message);
		}
	}
	

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

	return (
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-success">{message}</p>}
			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">User Information</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2">
										<form onSubmit={handleSubmitAvatar}>
											<div className="d-flex justify-content-center align-items-center mb-4">
												<img
													src={user.avatar || "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"}
													alt="Profile"
													className="rounded-circle"
													style={{ width: "150px", height: "150px", objectFit: "cover" }}
												/>
											</div>
											<input
												required
												type="file"
												className="form-control"
												id="avatar"
												name="avatar"
												onChange={handleAvatarChange}
											/>
											{avatar && (
												<img
													
													src={`data:image/jpeg;base64,${avatar}`}
													style={{ maxWidth: "0px", maxHeight: "0px" }}
													className="mt-3"
												/>
											)}
											<button type="submit" className="btn btn-outline-primary mt-2"
											>
												Update Avatar
											</button>
										</form>
									</div>
									<div className="col-md-10">
										<div className="card-body">
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Email:</label>
												<div className="col-md-10">
													<p className="card-text">{user.email}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Phone:</label>
												<div className="col-md-10">
													<p className="card-text">{user.phone}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Address:</label>
												<div className="col-md-10">
													<p className="card-text">{user.address}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Roles:</label>
												<div className="col-md-10">
													<ul className="list-unstyled">
														{user.roles.map((role) => (
															<li key={role.id} className="card-text">
																{role.name}
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to="/edit-profile" className="btn btn-outline-warning">
									Edit Profile
								</Link>
							</div>

							<h4 className="card-title text-center">Booking History</h4>

							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											{/* <th scope="col">Booking ID</th>
											<th scope="col">Room ID</th> */}
											<th scope="col">S/N</th>
											<th scope="col">Room Type</th>
											<th scope="col">Room price</th>
											
											<th scope="col">Check In Date</th>
											<th scope="col">Check Out Date</th>
											<th scope="col">Confirmation Code</th>
											{/* <th scope="col">Status</th> */}
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
												<tr key={index}>
													{/* <td>{booking.id}</td>
													<td>{booking.room.id}</td> */}
													<td>{index + 1}</td>
													<td>{booking.room.roomType}</td>
													<td>${booking.room.roomPrice}/night</td>
													<td>
														{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
													</td>
													<td>
														{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
													</td>
													<td>{booking.bookingConfirmationCode}</td>
													{/* <td>{booking.status}</td> */}
												</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)}
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile
