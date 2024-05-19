import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, updatePassword } from '../utils/ApiFunctions';

const UpdatePassword = () => {
  const [updatePasswordData, setUpdatePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    roles: [{ id: "", name: "" }]
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleInputChange = (e) => {
    setUpdatePasswordData({
      ...updatePasswordData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePassword(user.id, updatePasswordData, token);
      if (response) {
        setMessage("Password updated successfully!");
        setErrorMessage("");
        setUpdatePasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setTimeout(() => {
          navigate('/profile');
        }, 2000); 
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='wrapper-background'>
      <div className='wrapper'>
        <div className='remember-forgot'>
          <span><Link to="/profile"><IoMdArrowBack />Back to profile</Link></span>
        </div>
        <h1>Update Password</h1>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {message && <div className="text text-center" style={{ color: "limegreen", backgroundColor: "rgba(20, 10, 30, 0.5)", borderRadius: "4px" }}>
        {message}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              placeholder="Old Password"
              value={updatePasswordData.oldPassword}
              onChange={handleInputChange}
              required
            />
            {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              value={updatePasswordData.newPassword}
              onChange={handleInputChange}
              required
            />
            {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={updatePasswordData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {showPassword ? <FaEyeSlash className='icon' onClick={toggleShowPassword} /> : <FaEye className='icon' onClick={toggleShowPassword} />}
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
