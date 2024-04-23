import React, { useState } from 'react'
import { forgotPassword } from '../utils/ApiFunctions'

const ForgotPass = () => {
    const[errorMessages, setErrorMessages] = useState("")
    const[forgotPassData, setForgotPassData] = useState({
        email: ""
    })

    const[successMessages, setSuccessMessages] = useState("")

    const handleInputChange = (e) => {
        setForgotPassData({
            ...forgotPassData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await forgotPassword(forgotPassData)

        if (success) {
            setSuccessMessages("Email sent. Please check your email.")
            setErrorMessages("")
            setForgotPassData({
                email: ""
            })
        } else {
            setErrorMessages("Invalid email. Please try again.")
        }

        setTimeout(() => {
            setErrorMessages("")
            setSuccessMessages("")
        }, 3000)
    }


    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    {errorMessages && <div className="notice danger">{errorMessages}</div>}
                    {successMessages && <div className="notice success">{successMessages}</div>}
                    <div className="input-box">
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={forgotPassData.email}
                        onChange={handleInputChange}
                        required />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass