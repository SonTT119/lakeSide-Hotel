import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUser, updateAvatar } from "../utils/ApiFunctions"
import "./Profile.css"

const Profile = () => {
	const [user, setUser] = useState({
				id: "",
				email: "",
				firstName: "",
				lastName: "",
				avatar: "",
				roles: [{ id: "", name: "" }]
			})
	const [avatar, setAvatar] = useState("")
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [updatePasswordData, setUpdatePasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: ""
	})
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
	

	return (
	<>
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-success">{message}</p>}
			{user ? (
				<div className="p-3 mt-2" style={{ backgroundColor: "whitesmoke" }}>
					<h2 className="text-center mb-3">User Information</h2>
					<div className="card-body-p5" >
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 mt-3 shadow" style={{ backgroundColor: "white", borderRadius:"15px" }}>
								<div className="row g-0">
									<div className="col-md-2">
										<form onSubmit={handleSubmitAvatar}>
											<div className="d-flex justify-content-center align-items-center mb-4">
												<img
													src={avatar || "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"}
													alt="Profile"
													className="rounded-circle"
													style={{ width: "150px", height: "150px", objectFit: "cover" }}
												/>
											</div>
											{/* <input
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
											<button type="submit" className="btn btn-outline-primary mt-2"  style={{backgroundColor:"aliceblue"}}
											>
												Update Avatar
											</button> */}
											<div className="d-grid gap-2 d-md-flex mt-2">
												<Link to="/edit-profile" className="btn btn-outline-warning"  style={{backgroundColor:"aliceblue"}}>
													Edit Profile
												</Link>
												
											</div>
											<div className="d-grid gap-2 d-md-flex mt-2">
												
												<Link to="/update-password" className="btn btn-outline-danger" style={{backgroundColor:"aliceblue"}}>
													Update Password
												</Link>
											</div>
										</form>
									</div>
									<div className="col-md-10">
										<div className="card-body-content">
											<hr />
											<div className="form-group row">
												<label className="col-md-2  fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2  fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2  fw-bold">Email:</label>
												<div className="col-md-10">
													<p className="card-text">{user.email}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2  fw-bold">Phone:</label>
												<div className="col-md-10">
													<p className="card-text">{user.phone}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2  fw-bold">Address:</label>
												<div className="col-md-10">
													<p className="card-text">{user.address}</p>
												</div>
											</div>
											<hr />
											<div className="form-group row">
												<label className="col-md-2 fw-bold">Roles:</label>
												<div className="col-md-10">
													<ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
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

							
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>

		
	</>
	)
}

export default Profile
