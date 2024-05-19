import React, { useEffect, useState } from 'react';
import { FaCar, FaHeart, FaParking, FaRegHeart, FaRegStar, FaStar, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import SimilarRooms from '../common/SimilarRooms';
import Footer from '../layout/Footer';
import RoomReview from '../review/RoomReview';
import { addToFavorite, getAllUserFavorites, getCountById, getRatingById, getRoomById, removeFromFavorite } from '../utils/ApiFunctions';
import './RoomDetail.css';

const RoomDetail = () => {
    const [room, setRoom] = useState({
        photo: '',
        roomType: '',
        roomPrice: '',
        maxAdults: '',
        maxChildren: ''
    });

    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [rating, setRating] = useState(null);
    const [evaluate, setEvaluate] = useState(null);
    const { roomId } = useParams();
    const userEmail = localStorage.getItem('userId');
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getRoomById(roomId).then(setRoom);
    }, [roomId]);

    useEffect(() => {
        getRatingById(roomId).then(setRating);
    }, [roomId]);

    useEffect(() => {
        getCountById(roomId).then(setEvaluate);
    }, [roomId]);

    useEffect(() => {
        const fetchFavorites = async () => {
            let favoritesList;
            const localFavorites = localStorage.getItem('favorites');
            if (localFavorites) {
                favoritesList = JSON.parse(localFavorites);
            } else {
                const response = await getAllUserFavorites(userEmail);
                favoritesList = response;
                localStorage.setItem('favorites', JSON.stringify(favoritesList));
            }
            setFavorites(favoritesList);
            const found = favoritesList.some(favorite => favorite.roomId === roomId);
            setIsFavorite(found);
        };
        fetchFavorites();
    }, [userEmail, roomId]);

    useEffect(() => {
        localStorage.setItem('isFavorite', JSON.stringify(isFavorite));
    }, [isFavorite]);

    const renderStars = (rating) => {
        const stars = [];
        const maxStars = 5;
        const roundedRating = Math.round(rating);

        for (let i = 0; i < maxStars; i++) {
            stars.push(i < roundedRating ? <FaStar key={i} className='color-star' /> : <FaRegStar key={i} className='star' />);
        }

        return stars;
    };

    const handleFavoriteToggle = async () => {
        try {
            if (isFavorite) {
                await removeFromFavorite(userEmail, roomId);
                const updatedFavorites = favorites.filter(favorite => favorite.roomId !== roomId);
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                setIsFavorite(false);
                setSuccessMessage("Room removed from favorites successfully");
            } else {
                await addToFavorite(userEmail, roomId);
                const updatedFavorites = [...favorites, { roomId, userEmail }];
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                setIsFavorite(true);
                setSuccessMessage("Room added to favorites successfully");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while updating your favorites list.");
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <div>
            <section className='container' style={{ backgroundColor: "whitesmoke", padding: "10px" }}>
                <div className="room-similar">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" style={{ width: '100%', height: '350px', borderRadius: "3%", marginBottom: "5px" }} />
                            <div className="image-grid">
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
                                <img src={`data:image/png;base64, ${room.photo}`} alt="Room photo" className="small-image" />
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
                                    <h5>Max Adults: {room.maxAdults}</h5>
                                </div>
                                <div className="col-md-6">
                                    <h5>Max Children: {room.maxChildren}</h5>
                                </div>
                            </div>
                            <hr />
                            <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                <h5>Room Service</h5>
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
                            <hr />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div onClick={handleFavoriteToggle} className='btn btn-outline-info'>
                                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                                    <span>{isFavorite ? " Remove from Favorites" : " Add to Favorites"}</span>
                                </div>
                                <Link to={`/book-room/${roomId}`} className='btn btn-hotel'>
                                    Book Room Now
                                </Link>
                            </div>
                            <p style={{ color: "green" }}>{successMessage}</p>
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        </div>
                    </div>
                </div>
                <RoomReview roomId={roomId} />
                {room.roomType && <SimilarRooms roomInfo={room.roomType} />}
            </section>
            <Footer />
        </div>
    );
};

export default RoomDetail;
