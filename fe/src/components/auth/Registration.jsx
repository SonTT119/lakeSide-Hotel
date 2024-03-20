import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registration } from '../utils/ApiFunctions'

const Registration = () => {
    const[registrationData, setRegistrationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        // confirmPassword: ""
    })

    const[errorMessages, setErrorMessages] = useState("")
    const[successMessages, setSuccessMessages] = useState("")

    const handleInputChange = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value
        })
    }

    const  handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await registration(registrationData)
            if (result) {
                setSuccessMessages("Registration successful. Please login.")
                setErrorMessages("")
                setRegistrationData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    // confirmPassword: ""
                })
            }
        } catch (error) {
            setSuccessMessages("")
            setErrorMessages(`Error registering user: ${error.message}`)
        }

        setTimeout(() => {
            setErrorMessages("")
            setSuccessMessages("")
        }, 3000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessages && <p className="alert alert-danger">{errorMessages}</p>}
            {successMessages && <p className="alert alert-success">{successMessages}</p>}
            <h2>Registration</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                    <div>
                        <input type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={registrationData.firstName}
                        onChange={handleInputChange}
                        required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                    <div>
                        <input type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={registrationData.lastName}
                        onChange={handleInputChange}
                        required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div>
                        <input type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={registrationData.email}
                        onChange={handleInputChange}
                        required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div>
                        <input type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={registrationData.password}
                        onChange={handleInputChange}
                        required />
                    </div>
                </div>
                <div className='mb-3'>
                    <button type="submit" className="btn btn-hotel"
                    style={{marginRight: "10px"}}
                    >Register</button>
                    <span style={{marginRight: "10px"}}>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>

                </div>
            </form>
        </section>
    )
}

export default Registration