import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { addAdmin, getAllRoles } from '../utils/ApiFunctions'
//them role css
import "./AddUser.css"

const AddAdmin = () => {
    const [registrationData, setRegistrationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [roles, setRoles] = useState([{ id: "", name: "" }])

    const [errorMessages, setErrorMessages] = useState("")
    const [successMessages, setSuccessMessages] = useState("")
    const [showPassword, setShowPassword] = useState(false) // State để xác định xem mật khẩu có được hiển thị hay không

    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        try {
            const result = await getAllRoles()
            setRoles(result)
        } catch (error) {
            setErrorMessages(`Error fetching roles: ${error.message}`)
        }
    }

    const handleInputChange = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await addAdmin(registrationData, registrationData.role)
            if (result) {
                setSuccessMessages("Add user successful.")
                setErrorMessages("")
                setRegistrationData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: ""
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
    const toggleShowPassword = () => {
        setShowPassword(!showPassword) // Chuyển đổi trạng thái của state hiển thị mật khẩu
    }

    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <form onSubmit={handleFormSubmit}>
                    <div className='remember-forgot'>
                        <span><Link to="/existing-users"><IoMdArrowBack/>Back </Link></span>
                    </div>
                    <h1>ADD USER</h1>
                    {errorMessages && <div className="error-message">{errorMessages}</div>}
                    {successMessages && <div className="alert alert-success">{successMessages}</div>}
                    <div className='input-group'>
                        <div className="input-item">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder='First Name'
                                value={registrationData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-item">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder='Last Name'
                                value={registrationData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={registrationData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    <div className="select">
                        <select
                            id="role"
                            name="role"
                            value={registrationData.role}
                            onChange={handleInputChange}
                            required
                            style={{ color: registrationData.role === "" ? "#a5a5a5" : "#000" }}
                        >
                            <option value="" selected disabled>Select role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"} // Sử dụng state để quyết định loại của trường nhập
                            id="password"
                            name="password"
                            placeholder='Password'
                            value={registrationData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"} // Sử dụng state để quyết định loại của trường nhập
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={registrationData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
                    </div>
                    <button type="submit">ADD</button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin
