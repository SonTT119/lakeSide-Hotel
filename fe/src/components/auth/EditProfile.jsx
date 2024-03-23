import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserById, updateUser } from '../utils/ApiFunctions'


const EditProfile = () => {
    
    const [user, setEditUser] = useState({
        email: "",
        firstName: "",
        lastName: ""
    })

    const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(userId, user);
            if (response) {
                setMessage("User updated successfully!");
                const updatedUserData = await getUserById(userId);
                setUser(updatedUserData);
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating user: Response is empty");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An unexpected error occurred while updating user");
            }
        }

        setTimeout(() =>{
            setMessage("")
            setErrorMessage("")
        
        },3000)
    }

	useEffect(() => {
		const fetchUser = async () => {
			try {
                const userData = await getUserById(userId, token)
                setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

    return (
        <div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-danger">{message}</p>}
			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">User Information</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2">
										<div className="d-flex justify-content-center align-items-center mb-4">
											<img
												src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
												alt="Profile"
												className="rounded-circle"
												style={{ width: "150px", height: "150px", objectFit: "cover" }}
											/>
										</div>
									</div>

									<div className="col-md-10">
										<div className="card-body">
											{/* <div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">ID:</label>
												<div className="col-md-10">
													<p className="card-text">{user.id}</p>
												</div>
											</div> */}
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
                                                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} required />
												</div>
											</div>
											<hr />

											{/* <div className="form-group row">
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
											</div> */}
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
    )
}

export default EditProfile