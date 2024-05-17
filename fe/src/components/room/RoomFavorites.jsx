import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import Footer from '../layout/Footer';
import { getAllUserFavorites, getRoomById, removeFromFavorite } from '../utils/ApiFunctions';
import RoomCardFavorite from './RoomCardFavorite';

const RoomFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [roomData, setRoomData] = useState({});

  const {user} = useContext(AuthContext)

  const isLoggedIn = user !== null;

  const userEmail = localStorage.getItem('userId');

  useEffect(() => {
    getAllUserFavorites(userEmail).then((response) => {
        setFavorites(response);
    });
  }, [userEmail]);

  const getRoomData = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomData(prevState => ({ ...prevState, [roomId]: response }));
    } catch (error) {
      console.error(error);
    }
  }

  const removeRoomFromFavorites = async (roomId) => {
    try {
      await removeFromFavorite(userEmail, roomId);
      setFavorites(favorites.filter(favorite => favorite.roomId !== roomId));
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    favorites.forEach((favorite) => {
      getRoomData(favorite.roomId);
    })
  }, [favorites]);
  

  
  return (
    <>
    <section className="bg-light p-2 mb-5 mt-5 shadow">
    {isLoggedIn && (
      <section className="bg-light p-2 mb-5 mt-5 shadow">
      <h2>My Favorite Rooms</h2>
      {favorites.length > 0 ? (
        <ul className="favorite-list">
          {favorites.map((favorite) => (
            <li className='li-favorite' key={favorite.id}>
              <div className="favorite-item">
                {roomData[favorite.roomId] && <RoomCardFavorite room={roomData[favorite.roomId]} handleDelete={() =>removeRoomFromFavorites(favorite.roomId)}/>}
              </div>
            </li> 
          ))}
        </ul>
      ) : (
        <p>No rooms in your favorite list.</p>
      )}
    </section>
    )}
    {!isLoggedIn && (
      <section className="bg-light p-2 mb-5 mt-5 shadow">
        <h2>My Favorite Rooms</h2>
        <p>Please log in to see your favorite rooms</p>
        <Link to={"/"} className="btn btn-outline-info mr-3 link-home">Back to Home</Link>
        <Link to={"/login"} className="btn btn-outline-info link-login">Login</Link>
      </section>
    )}
    </section>
    <Footer/>
    </>
  );
}

export default RoomFavorites