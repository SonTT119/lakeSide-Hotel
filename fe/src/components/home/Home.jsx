import React from "react";
import { useLocation } from "react-router-dom";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import MainHeader from "../layout/MainHeader";


const Home = () => {
    const location = useLocation();
    const message = location.state && location.state.message;
    const currentUser = localStorage.getItem("userId");

    return (
        <section>
            {message && <div className="text-warning px-5">{message}</div>}
            {currentUser && <div className="text-success text-center">You are login as {currentUser}!</div>}
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
        </section>
    );
}

export default Home;