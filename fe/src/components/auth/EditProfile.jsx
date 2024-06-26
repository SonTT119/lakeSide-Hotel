import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser, updateUser } from "../utils/ApiFunctions"

const EditProfile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        roles: [{ id: "", name: "" }]
    })
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
			} catch (error) {
                setErrorMessage(error.message)
            }
		}

		fetchUser()
	}, [userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(user.id, user); // use `user` instead of `users`
            if (response) {
                setMessage("User updated successfully!");
                const updatedUserData = await getUser(userId, token); // use `getUser` instead of `getUserById`
                setUser(updatedUserData); // use `setUser` instead of `setUsers`
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

return (
    user && (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-success">{message}</p>}
            <div className=" p-3 mt-2" style={{ backgroundColor: "whitesmoke", display:"block"}}>
                <h2 className="text-center mb-4">Edit Profile</h2>
                <div className="card-body-content" style={{borderRadius:"15px", width:"50%", marginLeft:"320px"}}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label" style={{fontSize:"17px"}}>First Name:</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} style={{borderRadius:"15px"}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label" style={{fontSize:"17px"}}>Last Name:</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} style={{borderRadius:"15px"}} />
                        </div>
                        {/* <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
                        </div> */}
                        {/* phone */}
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label" style={{fontSize:"17px"}}>Phone:</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleChange} style={{borderRadius:"15px"}} />
                        </div>
                        {/* address */}
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label" style={{fontSize:"17px"}}>Address:</label>
                            <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleChange} style={{borderRadius:"15px"}} />
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-2">Save Changes</button>
                        <Link to="/profile" className="btn btn-outline-warning ms-2 mt-2">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
)
    
    }
export default EditProfile
