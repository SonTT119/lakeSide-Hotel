import React, { useState } from 'react';
import { CiLock } from 'react-icons/ci';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { forgotPassword, resetPassword, verifyOTP } from '../utils/ApiFunctions';


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
    const [showPassword, setShowPassword] = useState(false); // Trạng thái xem mật khẩu

    const handleInputChange = (e) => {
        setForgotPassData({
            ...forgotPassData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await forgotPassword({email: forgotPassData.email});

            if (success) {
                setSuccessMessages("An email for resetting your password has been sent.");
                setShowOTPForm(true);
            } else {
                setErrorMessages("Failed to send email. Please try again.");
                setSuccessMessages("");
                setShowOTPForm(false);
            }
        } catch (error) {
            setErrorMessages("Failed to send email. Please try again.");
            setSuccessMessages("");
            setShowOTPForm(false);
        }
        setTimeout(() => {
            setErrorMessages("");
        }
        , 3000);
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await verifyOTP({ email: forgotPassData.email, otp: forgotPassData.otp });
    
            if (success) {
                setSuccessMessages("OTP verified successfully. You can now reset your password");
                setShowOTPForm(false);
                setShowNewPassForm(true);
            } else {
                setErrorMessages("Failed to verify OTP. Please try again.");
                setSuccessMessages("");
                setShowNewPassForm(false); // Hiển thị form mới khi xác minh OTP không thành công
            }
        } catch (error) {
            setErrorMessages("Failed to verify OTP. Please try again.");
            setSuccessMessages("");
            setShowNewPassForm(false); // Hiển thị form mới khi xác minh OTP không thành công
        }
    
        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp nhau không trước khi gọi hàm resetPassword
            if (forgotPassData.newPassword !== forgotPassData.confirmPassword) {
                setErrorMessages("New password and confirm password do not match.");
                setSuccessMessages("");
                return;
            }
    
            // Gọi hàm resetPassword với dữ liệu cần thiết
            const success = await resetPassword(forgotPassData.email, {newPassword: forgotPassData.newPassword, confirmPassword: forgotPassData.confirmPassword})
    
            if (success) {
                setSuccessMessages("Password reset successfully. Please login.");
                setErrorMessages("");
                setShowNewPassForm(false);
            } else {
                setErrorMessages("Failed to reset password. Please try again.");
                setSuccessMessages("");
                setShowNewPassForm(true);
                setShowOTPForm(false);
            }
        } catch (error) {
            setErrorMessages("Failed to reset password. Please try again.");
            setSuccessMessages("");
            setShowNewPassForm(true);
            setShowOTPForm(false);
        }

        setTimeout(() => {
            setErrorMessages("");
        }, 3000);
    }
    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
                        {/* <br />
                        <Link to="/login">OK</Link> Liên kết đến màn hình đăng nhập */}
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
                            <button type="submit" className="btn">Verify OTP</button> {/* Changed text for clarity */}
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
                            <button type="submit" className="btn" onClick={handleResetPassword}>Reset Password</button>
                        </>
                    )}
                    {errorMessages && <div className="text text-center" style={{color:"crimson", backgroundColor: "rgba(20, 10, 30, 0.5", borderRadius:"4px", marginTop:"10px"}}>
                            {errorMessages}
                        </div>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;
