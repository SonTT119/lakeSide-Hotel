import React, { useContext, useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/ApiFunctions'
import { AuthContext } from './AuthProvider'
// import "./login.css"
// import "./Login.css"

const Login = () => {
    const[errorMessages, setErrorMessages] = useState("")
    const[loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const{handleLogin} = useContext(AuthContext)

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await login(loginData)
        if (success) {
            const token = success.token
            handleLogin(token)
            navigate("/")
            // window.location.reload()
        } else {
            setErrorMessages("Invalid email or password. Please try again.")
        }

        setTimeout(() => {
            setErrorMessages("")
        }, 3000)
    }
    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {errorMessages && <div className="alert alert-danger">{errorMessages}</div>}
                    <div className="input-box">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="email"
                        // className="form-control"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={loginData.email}
                        onChange={handleInputChange}
                        required />
                        <MdEmail className='icon'/>
                    </div>
                    <div className="input-box">
                        {/* <label htmlFor="password">Password</label> */}
                        <input type="password"
                        // className="form-control"
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={loginData.password}
                        onChange={handleInputChange}
                        required />
                        <FaLock className='icon'/>
                    </div>
                    <div className='remember-forgot'>
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className='sign-up'>
                        <span>Don't have an account? <Link to="/register">Register</Link></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login