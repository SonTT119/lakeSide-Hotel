import React from "react";
import { Card, Col } from "react-bootstrap";
import { FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

const RoomCard = ({room, handleDelete}) => {
    const wifiTexts = [
        <Card.Text key={1}><FaWifi className="icon" /> Free Wifi</Card.Text>,
        <Card.Text key={2}><FaTv className="icon"/> Netflix Premium</Card.Text>,
        <Card.Text key={3}><FaUtensils className="icon"/> Breakfast</Card.Text>,
        <Card.Text key={4}><FaTshirt className="icon"/> Laundry</Card.Text>,
        <Card.Text key={5}><FaWineGlassAlt className="icon"/> Mini Bar</Card.Text>
    ];

    const randomWifiTexts = shuffleArray(wifiTexts).slice(0, 3);

    return(
        <Col className="mb-4" xs={12} key={room.id}>
            <Card className="card-room">
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/book-room/${room.id}`}>
                            <Card.Img
                            variant="top"
                            src={`data:image/png;base64, ${room.photo}`}
                            alt="Room photo"
                            style={{width:"100%", maxWidth: "200px", height: "auto"}}/>
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">
                            {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                            {room.roomPrice} VND / night
                        </Card.Title>
                        <div style={{ fontFamily: "'Roboto', sans-serif", fontSize:"13px", color:"aquamarine"}}>
                            <Card.Text>Max Adults: {room.maxAdults}</Card.Text> 
                            <Card.Text>Max Children: {room.maxChildren}</Card.Text>
                        </div>
                        <hr />
                        <div className="d-flex">
                            {randomWifiTexts.map((text, index) => (
                                <React.Fragment key={text.key}>
                                    {index > 0 && <span className="mx-1">|</span>}
                                    <div className="mr-1">
                                        {text}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mr-3">
                            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                                Book Now
                            </Link>
                        </div>
                        <div className="mr-3">
                            <Link to={`/roomdetail/${room.id}`} className="btn btn-detail btn-sm">
                                Details
                            </Link>
                        </div>
                        <div className="mr-3">
                            <button className="btn btn-detail btn-sm" style={{backgroundColor: "crimson", color: 'white'}} onClick={handleDelete}>Remove Form Favorites</button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default RoomCard;
