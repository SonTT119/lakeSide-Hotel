import React, { useEffect, useState } from 'react';
import { FaRegComment, FaRegUser } from "react-icons/fa";
import { IoAccessibilityOutline } from "react-icons/io5";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { MdKeyboardControlKey, MdOutlineBedroomParent } from "react-icons/md";
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { getCountBookings, getCountReviews, getCountRoles, getCountRooms, getCountUsers } from '../utils/ApiFunctions';
import './Dashboard.css';

const Dashboard = () => {
    const [countUsers, setCountUsers] = useState("");
    const [countRooms, setCountRooms] = useState("");
    const [countBookings, setCountBookings] = useState("");
    const [countRoles, setCountRoles] = useState("");
    const [countReviews, setCountReviews] = useState("");

    useEffect(() => {
        getCountUsers().then((response) => {
            setCountUsers(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getCountRooms().then((response) => {
            setCountRooms(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getCountBookings().then((response) => {
            setCountBookings(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getCountRoles().then((response) => {
            setCountRoles(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getCountReviews().then((response) => {
            setCountReviews(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Sidebar>
            <div className="admin-content">
            <section className='container' style={{backgroundColor:"whitesmoke"}}>
                <div className="dashboard-content">
                    <div className="dashboard">
                        <div className="left">
                            <span className='title'>Users</span>
                            <span className="counter">{countUsers}</span>
                            <span>
                                <Link to={"/existing-users"} className="links">See all users</Link>
                            </span>
                        </div>
                        <div className="right">
                            <div className="percentage positive">
                                <MdKeyboardControlKey />20%
                            </div>
                            <FaRegUser className='icons' style={{ color: "crimson", backgroundColor: "rgba(225, 6, 0, 0.2" }} />
                        </div>
                    </div>
                    <div className="dashboard">
                        <div className="left">
                            <span className='title'>Rooms</span>
                            <span className="counter">{countRooms}</span>
                            <span>
                                <Link to={"/existing-rooms"} className="links">View all rooms</Link>
                            </span>
                        </div>
                        <div className="right">
                            <div className="percentage positive">
                                <MdKeyboardControlKey />20%
                            </div>
                            <MdOutlineBedroomParent className='icons' style={{ color: "blueviolet", backgroundColor: "rgba(25, 50, 60, 0.2" }} />
                        </div>
                    </div>
                    <div className="dashboard">
                        <div className="left">
                            <span className='title'>Bookings</span>
                            <span className="counter">{countBookings}</span>
                            <span>
                                <Link to={"/existing-bookings"} className="links">View all bookings</Link>
                            </span>
                        </div>
                        <div className="right">
                            <div className="percentage positive">
                                <MdKeyboardControlKey />20%
                            </div>
                            <LiaShoppingCartSolid className='icons' style={{ color: "goldenrod", backgroundColor: "rgba(128, 165, 30, 0.2" }} />
                        </div>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="dashboard">
                        <div className="left">
                            <span className='title'>Roles</span>
                            <span className="counter">{countRoles}</span>
                            <span>
                                <Link to={"/existing-roles"} className="links">See all roles</Link>
                            </span>
                        </div>
                        <div className="right">
                            <div className="percentage positive">
                                <MdKeyboardControlKey />20%
                            </div>
                            <IoAccessibilityOutline className='icons' style={{ color: "crimson", backgroundColor: "rgba(225, 6, 0, 0.2" }} />
                        </div>
                    </div>
                    <div className="dashboard">
                        <div className="left">
                            <span className='title'>Reviews</span>
                            <span className="counter">{countReviews}</span>
                            <span>
                                <Link to={"/existing-review"} className="links">View all reviews</Link>
                            </span>
                        </div>
                        <div className="right">
                            <div className="percentage positive">
                                <MdKeyboardControlKey />20%
                            </div>
                            <FaRegComment className='icons' style={{ color: "blueviolet", backgroundColor: "rgba(25, 50, 60, 0.2" }} />
                        </div>
                    </div>
                </div>
            </section>
            </div>
            </Sidebar>
        </>
    )
}

export default Dashboard;
