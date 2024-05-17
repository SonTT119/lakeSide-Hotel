import React, { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'; // Import sao và sao trắng từ thư viện react-icons
import { Link, useParams } from 'react-router-dom';
import { getCountById, getRatingById, getRoomById } from '../utils/ApiFunctions';

import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa';

import { addToFavorite, getAllUserFavorites, removeFromFavorite } from '../utils/ApiFunctions';

// import heart icon
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// import css
import Footer from '../layout/Footer';
import RoomReview from '../review/RoomReview';
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

    const [isFavorite, setIsFavorite] = useState(false);

    const [favorites, setFavorites] = useState([{
        roomId: '',
        userEmail: ''
    }]);


    const [rating, setRating] = useState(null);
    const [evaluate, setEvaluate] = useState(null);

    const { roomId } = useParams();

    const userEmail = localStorage.getItem('userId');

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

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

    useEffect(() => {
        getAllUserFavorites(userEmail).then((response) => {
            setFavorites(response);
        });
    }, [userEmail]);
    

    useEffect(() => {
        const found = favorites.find((favorite) => favorite.roomId === roomId);
        setIsFavorite(!!found);
    }, [favorites, roomId]);

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

    const addToFavorites = async () => {
        try {
            if (!isFavorite) {
                await addToFavorite(userEmail, roomId);
                setIsFavorite(true);
                setSuccessMessage("Room added to favorites successfully");
            } else {
                await removeFromFavorite(userEmail, roomId);
                setIsFavorite(false);
                setSuccessMessage("Room removed from favorites successfully");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("This room is already in your favorites list");
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };
    

    return (
        <div>
            <section className='container' style={{backgroundColor:"whitesmoke", padding:"10px"}}>
            <div className="room-similar ">
                <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                            <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" style={{ width: '100%', height: '350px', borderRadius: "3%", marginBottom:"5px"}} />
                            {/* Grid of small images */}
                            <div className="image-grid">
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
                                {/* Add more images here */}
                            </div>
                        </div>
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <h2>Room Type: {room.roomType}</h2>
                        {rating !== null &&
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <a href="#reviews" className='rating-link'>{rating}</a>
                                <h5>{renderStars(rating)}| </h5>
                                <a href="#reviews" className='rating-link'>{evaluate}</a>
                                <h5>Evaluate |</h5>
                            </div>}
                        <div className='room-price-detail'>
                            <h3>{room.roomPrice.toLocaleString()} VND / night</h3>
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
                        <hr />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div onClick={addToFavorites} className='btn btn-outline-info'>
                                {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                                <span>{isFavorite ? " Remove from Favorites" : " Add to Favorites"}</span>
                            </div>
                            <Link to={`/book-room/${roomId}`} className='btn btn-hotel'>
                                Book Room Now
                            </Link>
                            </div>
                            <p style={{color:"green"}}>{successMessage}</p>
                            <p style={{color:"red"}}>{errorMessage}</p>
                                                
                        {/* <ul>
                        {room.roomService.map((service, index) => (
                            <li key={index}>{service}</li>
                        ))}
                    </ul> */}
                    </div>
                </div>
            </div>

            <RoomReview roomId={roomId} />

        
        </section>
        <Footer />
    </div>
    );
};

export default RoomDetail;
