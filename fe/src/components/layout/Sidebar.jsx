import React, { useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { FaBars, FaCartFlatbed } from "react-icons/fa6";
import { MdBedroomParent, MdOutlineAddHome, MdOutlineDashboard } from "react-icons/md";
import { NavLink } from 'react-router-dom';




const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard ",
            icon:<MdOutlineDashboard />

        },
        {
            name: "Existing Rooms",
            path: "/existing-rooms",
            icon: <MdBedroomParent />

        },
        {
            name: "Add Room",
            path: "/add-room",
            icon: <MdOutlineAddHome />

        },
        {
            name: "Existing Users",
            path: "/existing-users",
            icon: <FaUsers />

        },
        {
            name: "Existing Bookings",
            path: "/existing-bookings",
            icon: <FaCartFlatbed />

        }

    ]

    return (
            <div className="container-sidebar">
            <div style={{width: isOpen ? "200px" : "100px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}
                        />
                    </div>
                </div>
                {
                    menuItems.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar