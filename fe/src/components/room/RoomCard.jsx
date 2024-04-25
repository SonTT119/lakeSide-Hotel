import React from "react";
import { Card, Col } from "react-bootstrap";
import { FaWifi } from 'react-icons/fa';
import { Link } from "react-router-dom";


const RoomCard = ({room}) =>{
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
                            ${room.roomPrice} / night
                        </Card.Title>
                        <hr />
                        <Card.Text><FaWifi className="icon" /> Free Wifi</Card.Text>
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
                    </div>
        
                </Card.Body>
            </Card>
        </Col>
    )
}

export default RoomCard;