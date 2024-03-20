import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById, updateUser } from '../utils/ApiFunctions'


const EditUser = () => {
    const [user, setUser] = useState({
        // id: "",
        email: "",
        firstName: "",
        lastName: "",
        // roles: [{ id: "", name: "" }]
    })

    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { userId } = useParams()
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId)
                setUser(userData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    },[userId])

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
    }
    


    return (
        <>
            <div className='container mt-5 mb-5'>
                <h3 className='text-center mb-5 mt-5'>Edit User</h3>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        {message && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                {message}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleInputChange} required />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <input type="text" className="form-control" id="role" name="role" value={user.roles[0].name} onChange={handleInputChange} required />
                            </div> */}
                            <div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-users"} className="btn btn-outline-info ml-5">
									back
								</Link>
								
								<button className="btn btn-outline-warning"
								onClick={handleSubmit}
								>
									Edit Room
								</button>
							</div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser