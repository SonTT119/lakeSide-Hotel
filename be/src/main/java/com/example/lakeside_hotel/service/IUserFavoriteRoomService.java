package com.example.lakeside_hotel.service;

import java.util.List;

import com.example.lakeside_hotel.model.UserFavoriteRoom;

public interface IUserFavoriteRoomService {

    UserFavoriteRoom addRoomToFavoriteList(Long roomId, String email);

    List<UserFavoriteRoom> getAllFavoriteRoomsByUserId(String email);

    // void removeRoomFromFavoriteList(Long roomId, String email);

    boolean isRoomInFavoriteList(Long roomId, String email);

    void removeRoomFromFavoriteList(Long roomId, String email);

}
