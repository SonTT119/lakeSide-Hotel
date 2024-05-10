package com.example.lakeside_hotel.reponse;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserFavoriteRoomResponse {
    private Long id;
    private Long userId;
    private Long roomId;

    public UserFavoriteRoomResponse(Long id, Long userId, Long roomId) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
    }
}
