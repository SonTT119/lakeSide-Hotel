import React, { useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { forgotPassword, verifyOTP } from '../utils/ApiFunctions';

const ForgotPass = () => {
    const [errorMessages, setErrorMessages] = useState("");
    const [forgotPassData, setForgotPassData] = useState({
        email: "",
        otp: ""
    });
    const [successMessages, setSuccessMessages] = useState("");
    const [showOTPForm, setShowOTPForm] = useState(false);

    const handleInputChange = (e) => {
        setForgotPassData({
            ...forgotPassData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await forgotPassword(forgotPassData);

        if (success) {
            setSuccessMessages("An email for resetting your password has been sent.");
            setForgotPassData({
                email: ""
            });
            setShowOTPForm(true);
        } else {
            setErrorMessages("Failed to send email. Please try again.");
            setSuccessMessages("");
            setShowOTPForm(false);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        const success = await verifyOTP(forgotPassData);

        if (success) {
            setSuccessMessages("Password reset successful.");
            setForgotPassData({
                email: "",
                otp: ""
            });
        } else {
            setErrorMessages("Failed to reset password. Please try again.");
            setSuccessMessages("");
        }
    };

    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <div className='remember-forgot'>
                    <span><Link to="/login"><IoMdArrowBack/>Back to Login</Link></span>
                </div>
                <form onSubmit={showOTPForm ? handleOTPSubmit : handleSubmit}>
                    <CiLock className="icon-forgot"/>
                    <h1>Forgot Password</h1>
                    <div className='text text-center'>Enter your email and we'll send you an OTP to get back into your account</div>
                    {successMessages ? (
                    <div className="text text-center" style={{color:"limegreen", backgroundColor: "rgba(20, 10, 30, 0.5", borderRadius:"4px"}}>  
                        {successMessages}
                    </div>
                    ) : (
                        <div className="input-box">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={forgotPassData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}
                    {!successMessages && !showOTPForm && <button type="submit" className="btn">Send OTP</button>}
                    {showOTPForm && (
                        <>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    value={forgotPassData.otp}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn">Reset Password</button> {/* Changed text for clarity */}
                        </>
                    )}
                    {errorMessages && <div className="message text-center error">
                            {errorMessages}
                        </div>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;
