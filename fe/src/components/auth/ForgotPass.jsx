import React, { useEffect, useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, resendOTP, resetPassword, verifyOTP } from '../utils/ApiFunctions';

const ForgotPass = () => {
    const [errorMessages, setErrorMessages] = useState("");
    const [forgotPassData, setForgotPassData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [successMessages, setSuccessMessages] = useState("");
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [showNewPassForm, setShowNewPassForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setForgotPassData({
            ...forgotPassData,
            [e.target.name]: e.target.value
        });
    };

    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            const success = await forgotPassword({ email: forgotPassData.email });
            if (success) {
                setSuccessMessages("An email for resetting your password has been sent.");
                setShowOTPForm(true);
            } else {
                setErrorMessages("Failed to send email. Please try again.");
            }
        } catch (error) {
            setErrorMessages("Failed to send email. Please try again.");
        }
        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    };

    const resendEmail = async () => {
        try {
            const success = await resendOTP({ email: forgotPassData.email });
            if (success) {
                setSuccessMessages("A new OTP has been sent to your email.");
            } else {
                setErrorMessages("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            setErrorMessages("Failed to resend OTP. Please try again.");
        }
        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await verifyOTP({ email: forgotPassData.email, otp: forgotPassData.otp });
            if (success) {
                setSuccessMessages("OTP verified successfully. You can now reset your password.");
                setShowOTPForm(false);
                setShowNewPassForm(true);
            } else {
                setErrorMessages("Failed to verify OTP. Please try again.");
            }
        } catch (error) {
            setErrorMessages("Failed to verify OTP. Please try again.");
        }
        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (forgotPassData.newPassword !== forgotPassData.confirmPassword) {
                setErrorMessages("New password and confirm password do not match.");
                return;
            }

            const success = await resetPassword(forgotPassData.email, { newPassword: forgotPassData.newPassword, confirmPassword: forgotPassData.confirmPassword });
            if (success) {
                setSuccessMessages("Password reset successfully. Please login.");
                // Reset state to hide all forms and clear data
                setForgotPassData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
                setShowNewPassForm(false);
                setShowOTPForm(false);
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            } else {
                setErrorMessages("Failed to reset password. Please try again.");
            }
        } catch (error) {
            setErrorMessages("Failed to reset password. Please try again.");
        }
        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (successMessages === "Password reset successfully. Please login.") {
            setShowOTPForm(false);
            setShowNewPassForm(false);
        }
    }, [successMessages]);

    return (
        <div className='wrapper-background'>
            <div className='wrapper'>
                <div className='remember-forgot'>
                    <span><Link to="/login"><IoMdArrowBack />Back to Login</Link></span>
                </div>
                
                    <CiLock className="icon-forgot" />
                    <h1>Forgot Password</h1>
                    <div className='text text-center'>Enter your email and we'll send you an OTP to get back into your account</div>
                    {successMessages && (
                        <div className="text text-center" style={{ color: "limegreen", backgroundColor: "rgba(20, 10, 30, 0.5)", borderRadius: "4px" }}>
                            {successMessages}
                        </div>
                    )}
                    {errorMessages && (
                        <div className="text text-center" style={{ color: "crimson", backgroundColor: "rgba(20, 10, 30, 0.5)", borderRadius: "4px" }}>
                            {errorMessages}
                        </div>
                    )}
                    {!showOTPForm && !showNewPassForm && (
                        <>
                        <form onSubmit={sendOTP}>
                            <div className="input-box">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={forgotPassData.email}
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <button type="submit" className="btn">Send OTP</button>
                            </form>
                        </>
                    )}
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
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={handleOTPSubmit} className="btn" style={{ marginRight: '10px', backgroundColor: '#70cd73' }}>Verify OTP</button>
                                <button type="button" className="btn" style={{ marginLeft: '10px', backgroundColor: '#5a98ad' }} onClick={resendEmail}>Resend OTP</button>
                            </div>
                        </>
                    )}
                    {showNewPassForm && (
                        <>
                            <div className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={forgotPassData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
                            </div>
                            <div className="input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={forgotPassData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
                            </div>
                            <button onClick={handleResetPassword} className="btn">Reset Password</button>
                        </>
                    )}
            </div>
        </div>
    );
};

export default ForgotPass;
