import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/ApiFunctions'
import { AuthContext } from './AuthProvider'

const Login = () => {
    const [errorMessages, setErrorMessages] = useState("")
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false) // State để xác định xem mật khẩu có được hiển thị hay không

    const navigate = useNavigate()
    const { handleLogin } = useContext(AuthContext)

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword) // Chuyển đổi trạng thái của state hiển thị mật khẩu
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await login(loginData)
            if (success) {
                const token = success.token
                handleLogin(token)
                navigate("/")
            }
        } catch (error) {
            setErrorMessages("Invalid email or password. Please try again.")
        }
    }

    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {errorMessages && <div className="error-message">{errorMessages}</div>}
                    <div className="input-box">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={loginData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"} // Sử dụng state để quyết định loại của trường nhập
                            id="password"
                            name="password"
                            placeholder='Password'
                            value={loginData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
                    </div>
                    <div className='remember-forgot'>
                        <label><input type="checkbox" />Remember me</label>
                        <span>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </span>
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
