import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section className="container mt-5">
            <h2> welcome to admin panel</h2>
            <hr />
            <Link to={"/existing-rooms"} className="btn btn-hotel btn-sm">
            Manage Rooms
            </Link>
            <hr />
            <Link to={"/existing-bookings"} className="btn btn-hotel btn-sm">
            Manage Bookings
            </Link>

            <hr />
            <Link to={"/existing-users"} className="btn btn-hotel btn-sm">
                Manage Users
            </Link>
            
        </section>
    )
}

export default Admin;