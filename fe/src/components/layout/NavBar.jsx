import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Logout from "../auth/Logout";

const Navbar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const { user } = useContext(AuthContext);
    const isLoggedIn = user !== null;
    const userRole = localStorage.getItem("userRole");

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

	const currentUser = localStorage.getItem("userId")

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">Home Hotel</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Manage
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/favorites"}>
                                Room Favorites
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-bookings"}>
                                Find My Bookings
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {isLoggedIn ? (
                                    <span>
                                        <img
											src={user.avatar || "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"}
											alt="Profile"
											className="rounded-circle"
											style={{ width: "30px", height: "30px", objectFit: "cover" }}
										/>
                                        {/* get name user */}
                                        {currentUser}
                                    </span>
                                ) : (
                                    "Account"
                                )}
                            </a>
                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {isLoggedIn ? (
                                    <>
                                        <li>
                                            <Logout />
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
