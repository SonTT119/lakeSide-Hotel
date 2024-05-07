import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import { getUserById, updateUser } from '../utils/ApiFunctions'

const EditUser = () => {
    const [users, setUsers] = useState({
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
        setUsers({ ...users, [name]: value })
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId)
                setUsers(userData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    },[userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(userId, users);
            if (response) {
                setMessage("User updated successfully!");
                const updatedUserData = await getUserById(userId);
                setUsers(updatedUserData);
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
    
    const{user} = useContext(AuthContext)

    const isLoggedIn = user !== null

	const userRole = localStorage.getItem("userRole")


    return (
        <section className='container'>
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
                <div className="container mt-5 mb-5">
                    <div className='row justify-content-center'>
                        <div className="col-md-8 col-lg-6">
                            <h2 className="mt-5 mb-2">Edit User</h2>
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
                                {/* <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} required />
                                </div> */}
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={users.firstName} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={users.lastName} onChange={handleInputChange} required />
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
                                        Edit User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {(!isLoggedIn || userRole !== "ROLE_ADMIN") && (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <h2 className="mt-5 mb-2">You are not authorized to view this page</h2>
                            <Link to={"/"} className="btn btn-outline-info">Back to Home</Link>
                        </div>
                    </div>
                </div>
            )}
            
        </section>
    )
}

export default EditUser