import React from "react";
import Footer from "../layout/Footer";
import Room from "./Room";

const RoomListing = () =>{
    return(
        <div>
            <section className="bg-light p-2 mb-5 mt-5 shadow">
                <Room/>
                
            </section>
            <Footer/>
        </div>
    )
}

export default RoomListing;