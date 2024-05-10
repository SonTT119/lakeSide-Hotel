import React, { useEffect, useState } from 'react';
import { getAllUserFavorites, getRoomById, removeFromFavorite } from '../utils/ApiFunctions';
import RoomCardFavorite from './RoomCardFavorite';

const RoomFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [roomData, setRoomData] = useState({});

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
    <section className="bg-light p-2 mb-5 mt-5 shadow">
      <h2>My Favorite Rooms</h2>
      <ul className="favorite-list">
        {favorites.map((favorite) => (
          <li className='li-favorite' key={favorite.id}>
            <div className="favorite-item">
              {roomData[favorite.roomId] && <RoomCardFavorite room={roomData[favorite.roomId]} handleDelete={() =>removeRoomFromFavorites(favorite.roomId)}/>}
              {/* <button className="remove-button" onClick={() => removeRoomFromFavorites(favorite.roomId)}>Remove from favorites</button> */}
            </div>
          </li> 
        ))}
      </ul>
    </section>
  );
}

export default RoomFavorites