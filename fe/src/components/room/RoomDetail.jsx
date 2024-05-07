import React, { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'; // Import sao và sao trắng từ thư viện react-icons
import { Link, useParams } from 'react-router-dom';
import { getCountById, getRatingById, getRoomById } from '../utils/ApiFunctions';

import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa';


// import css
import './RoomDetail.css';

const RoomDetail = () => {
    const [room, setRoom] = useState({
        photo: '',
        roomType: '',
        roomPrice: '',
        maxAdults: '',
        maxChildren: '',
        // roomService: []
    });
    const [rating, setRating] = useState(null);
    const [evaluate, setEvaluate] = useState(null);

    const { roomId } = useParams();

    useEffect(() => {
        getRoomById(roomId).then((response) => {
            setRoom(response);
        });
    }, [roomId]);

    useEffect(() => {
        getRatingById(roomId).then((response) => {
            setRating(response);
        });
    }, []);

    useEffect(() => {
        getCountById(roomId).then((response) => {
            setEvaluate(response);
        });
    }, []);

    // Function to convert numerical rating to stars
    const renderStars = (rating) => {
        const stars = [];
        const maxStars = 5;
        const roundedRating = Math.round(rating);

        for (let i = 0; i < maxStars; i++) {
            if (i < roundedRating) {
                stars.push(<FaStar key={i} className='color-star' />); // Sao đầy
            } else {
                stars.push(<FaRegStar key={i} className='star'/>); // Sao trắng
            }
        }

        return stars;
    };

    return (
        <section className='container' style={{backgroundColor:"whitesmoke", padding:"10px"}}>
        <div className="table-roomDetail ">
            <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                    <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" style={{ width: '80%', height: '250px', borderRadius: "3%"}} />
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12">
                    <h2>Room Type: {room.roomType}</h2>
                    {rating !== null &&
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={"/"} className='rating-link'>{rating}</Link>
                            <h5>{renderStars(rating)}| </h5>
                            <Link to={"/"} className='rating-link'>{evaluate}</Link>
                            <h5>Evaluate |</h5>
                        </div>}
                    <div className='room-price-detail'>
                        <h3>${room.roomPrice} / night</h3>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <h5 >Max Adults: {room.maxAdults}</h5>
                        </div>
                        <div className="col-md-6">
                            <h5>Max Children: {room.maxChildren}</h5>
                        </div>
                    </div>
                        <hr />
                    <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 >Room Service</h5>
                        <div className="col-md-6">
                            <ul className='list-unstyled'>
                                <li className='li'>
                                    <FaWifi /> Free Wifi
                                </li>
                                <li className='li'>
                                    <FaTv /> Netflix Premium
                                </li>
                                <li className='li'>
                                    <FaUtensils /> Breakfast
                                </li>
                                <li className='li'>
                                    <FaTshirt /> Laundry
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <ul className='list-unstyled'>
                                <li className='li'>
                                    <FaWineGlassAlt /> Mini Bar
                                </li>
                                <li className='li'>
                                    <FaCar /> Car Service
                                </li>
                                <li className='li'>
                                    <FaParking /> Parking
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    {/* link đến book phòng */}
                    <Link to={`/book-room/${roomId}`} className='btn btn-hotel'>
                        Book Room Now
                    </Link>
                    
                    {/* <ul>
                    {room.roomService.map((service, index) => (
                        <li key={index}>{service}</li>
                    ))}
                </ul> */}
                </div>
            </div>
        </div>
    </section>
    );
};

export default RoomDetail;
