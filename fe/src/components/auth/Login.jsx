import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/ApiFunctions'
import { AuthContext } from './AuthProvider'

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
        <section className='container col-6 mt-5 mb-5'>
            {errorMessages && <div className="alert alert-danger">{errorMessages}</div>}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div>
                        <input type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={loginData.email}
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
                        value={loginData.password}
                        onChange={handleInputChange}
                        required />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit"
                    style={{marginRight:"10px"}}
                    className="btn btn-hotel">Login</button>
                    <span style={{marginRight:"10px"}}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </div>
                
            </form>
        </section>
    )
}

export default Login