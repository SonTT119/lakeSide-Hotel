import React, { useContext, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Logout from "../auth/Logout";

const Navbar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const{user} = useContext(AuthContext)

    const handleAccountClick = () => {
        setShowAccount(!showAccount)
    }

    const isLoggedIn = user !== null

	const userRole = localStorage.getItem("userRole")

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">
                        Home Hotel
                    </span>
                </Link>
                <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">

                    </span>
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
                            <NavLink className="nav-link" to={"/find-bookings"}>
                                Find My Bookings
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
                                
                                {/* <li>
                                    <Link to={"/profile"} className="dropdown-item"> Profile</Link>
                                </li> */}
                                {/* <li>
                                    <hr className="dropdown-divider"/>
                                </li> */}
                                {/* <li>
                                    <Link to={"/logout"} className="dropdown-item"> Logout</Link>
                                </li> */}
                                
                            </ul>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
// import React, { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../auth/AuthProvider";
// import Logout from "../auth/Logout";

// const Navbar = () => {
//     const [showAccount, setShowAccount] = useState(false);
//     const { user } = useContext(AuthContext);
//     const [userData, setUserData] = useState(null); // Thêm state mới để lưu trữ thông tin người dùng

//     const handleAccountClick = () => {
//         setShowAccount(!showAccount);
//     }

//     const isLoggedIn = user !== null;

//     const userRole = localStorage.getItem("userRole");

//     // Hàm để lấy thông tin về hình ảnh đại diện và tên của người dùng sau khi họ đăng nhập
//     const getUserData = () => {
//         // Lấy thông tin từ nơi lưu trữ dữ liệu của bạn
//         // Ví dụ: localStorage hoặc một API
//         const userAvatar = localStorage.getItem("userAvatar");
//         const userName = localStorage.getItem("userName");
//         setUserData({ avatar: userAvatar, name: userName });
//     };

//     // Gọi hàm getUserData khi người dùng đăng nhập
//     if (isLoggedIn && !userData) {
//         getUserData();
//     }

//     return (
//         <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
//             <div className="container-fluid">
//                 <Link to={"/"} className="navbar-brand">
//                     <span className="hotel-color">
//                         Home Hotel
//                     </span>
//                 </Link>
//                 <button className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarScroll"
//                     aria-controls="navbarScroll"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarScroll">
//                     <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
//                         <li className="nav-item">
//                             <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
//                                 Browse all rooms
//                             </NavLink>
//                         </li>
//                         {isLoggedIn && userRole === "ROLE_ADMIN" && (
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" aria-current="page" to={"/admin"}>
//                                     Manage
//                                 </NavLink>
//                             </li>
//                         )}
//                     </ul>
//                     <ul className="d-flex navbar-nav">
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to={"/find-bookings"}>
//                                 Find My Bookings
//                             </NavLink>
//                         </li>
//                         <li className="nav-item dropdown">
//                             <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
//                                 href="#"
//                                 role="button"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                                 onClick={handleAccountClick}>
//                                 {isLoggedIn ? (
//                                     // Hiển thị hình ảnh đại diện và tên người dùng nếu đã đăng nhập
//                                     <div>
//                                         <img src={userData.avatar} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
//                                         {userData.name}
//                                     </div>
//                                 ) : (
//                                     "Account"
//                                 )}
//                             </a>
//                             <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
//                                 {isLoggedIn ? (
//                                     <Logout />
//                                 ) : (
//                                     <li>
//                                         <Link className="dropdown-item" to={"/login"}>
//                                             Login
//                                         </Link>
//                                     </li>
//                                 )}
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar;
