import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { MdKeyboardControlKey, MdOutlineBedroomParent } from "react-icons/md";
import Sidebar from '../layout/Sidebar';
import './Dashboard.css';


const Dashboard = () => {
    return (
    <>
        <Sidebar>
        <h2></h2>
        <h2>.</h2>
            <div className="dashboard-content">
                <div className="dashboard">
                    <div className="left">
                        <span className='title'>Users</span>
                        <span className="counter">32333</span>
                        <span className="links">See all users</span>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                            <MdKeyboardControlKey/>20%
                        </div>
                        <FaRegUser className='icons' style={{color: "crimson", backgroundColor: "rgba(225, 6, 0, 0.2"}}/>
                    </div>
                </div>
                <div className="dashboard">
                    <div className="left">
                        <span className='title'>Rooms</span>
                        <span className="counter">2002</span>
                        <span className="links">View all rooms</span>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                            <MdKeyboardControlKey/>20%
                        </div>
                        <MdOutlineBedroomParent className='icons' style={{color: "blueviolet", backgroundColor: "rgba(25, 50, 60, 0.2"}}/>
                    </div>
                </div>
                <div className="dashboard">
                    <div className="left">
                        <span className='title'>Bookings</span>
                        <span className="counter">333</span>
                        <span className="links">View all bookings</span>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                            <MdKeyboardControlKey/>20%
                        </div>
                        <LiaShoppingCartSolid className='icons' style={{color: "goldenrod", backgroundColor: "rgba(128, 165, 30, 0.2"}}/>
                    </div>
                </div>
                
                
            </div>
        </Sidebar>
    </>
    )
}

export default Dashboard