import React from 'react';
import { FaRegComment, FaUsers } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { IoAccessibilityOutline } from "react-icons/io5";
import { MdBedroomParent, MdOutlineDashboard } from "react-icons/md";
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
            name: "Existing Roles",
            path: "/existing-roles",
            icon: <IoAccessibilityOutline />

        },
        {
            name: "Existing Users",
            path: "/existing-users",
            icon: <FaUsers />

        },
        {
            name: "Existing Rooms",
            path: "/existing-rooms",
            icon: <MdBedroomParent />

        },
        {
            name: "Existing Reviews",
            path: "/existing-review",
            icon: <FaRegComment />


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