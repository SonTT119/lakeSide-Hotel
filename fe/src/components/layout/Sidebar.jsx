import React from 'react';
import { FaUsers } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdBedroomParent, MdOutlineAddHome, MdOutlineDashboard } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import logoImage from "../../assets/images/download.png";


const Sidebar = ({children}) => {
    
    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
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
            <div className="sidebar">
                <div className="top_section">
                    <Link to="/admin">
                    <img src={logoImage} alt="Logo" className="logo" style={{ width: '100px', height: 'auto', marginTop:"50px",borderRadius: "10%"}} />
                    </Link>
                </div>
                {
                    menuItems.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar