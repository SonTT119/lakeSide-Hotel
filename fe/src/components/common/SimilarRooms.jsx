import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getSimilarRooms } from '../utils/ApiFunctions';

const SimilarRooms = ({ roomInfo }) => {

    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getSimilarRooms(roomInfo)
            .then((data) => {
                const shuffledRooms = data.sort(() => Math.random() - 0.5);
                setRooms(shuffledRooms.slice(0, 4));
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, [roomInfo]);

    if (isLoading) {
        return <div className="mt-5">Loading rooms....</div>;
    }

    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error: {errorMessage}</div>;
    }

    return (
        <div>
            <section className="bg-light mb-5 mt-5 shadow room-similar">
                <h2 className='room-similar'>YOU MAY ALSO LIKE</h2>

                <Container>
                    <Row>
                        {rooms.map((room, index) => (
                            <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                <Card>
                                    <Link to={`/book-room/${room.id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={`data:image/png;base64, ${room.photo}`}
                                            alt="Room Photo"
                                            className="w-100"
                                            style={{ height: "200px" }}
                                        />
                                    </Link>
                                    <Card.Body className="">
                                        <Card.Title className="hotel-color">
                                            {room.roomType}
                                        </Card.Title>
                                        <Card.Title className="room-price">
                                            ${room.roomPrice} / night
                                        </Card.Title>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Roboto', sans-serif", fontSize: "13px", color: "aquamarine" }}>
                                            <Card.Text>Max Adults: {room.maxAdults}</Card.Text>
                                            <Card.Text>Max Children: {room.maxChildren}</Card.Text>
                                        </div>
                                        <div className="d-flex">
                                            {/* <div className="mr-3">
                                                <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                                                    Book Now
                                                </Link>
                                            </div> */}
                                            <div className="mr-3">
                                                <Link to={`/roomdetail/${room.id}`} className="btn btn-detail btn-sm">
                                                View Room details
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default SimilarRooms;
