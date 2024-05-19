import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import Footer from "../layout/Footer";
import MainHeader from "../layout/MainHeader";

const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;

    const{user} = useContext(AuthContext)

    const isLoggedIn = user !== null

	const currentUser = localStorage.getItem("userId")

    return (
        <section>
            {/* {message && <div className="text-warning px-5">{message}</div>} */}
            { isLoggedIn && currentUser && <div className="text-success text-center">You are login as {currentUser}!</div>}
            { !isLoggedIn && <div className="text-danger text-center">You are not login!</div>}
            <MainHeader/>
            <section className="container">
                <RoomSearch/>
                <RoomCarousel/>
                <Parallax />
                <RoomCarousel/>
                <HotelService/>
                <Parallax />
                <RoomCarousel/>
                
            </section>
            <Footer/>
        </section>
        
    );
}

export default Home;