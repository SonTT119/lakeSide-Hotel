package com.example.lakeside_hotel.reponse;

import com.example.lakeside_hotel.model.Room;
import com.example.lakeside_hotel.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long reviewId;
    private String comment;
    private int rating;
    private String user;
    private String roomId;
    private String roomType;

    public ReviewResponse(Long reviewId, String comment, int rating) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.rating = rating;
    }

    public ReviewResponse(Long reviewId, String comment, int rating, User user) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.rating = rating;
        this.user = user.getEmail();

    }

    public ReviewResponse(Long reviewId, String comment, int rating, User user, Room room) {
        this.reviewId = reviewId;
        this.comment = comment;
        this.rating = rating;
        this.user = user.getEmail();
        this.roomId = room.getId().toString();
        this.roomType = room.getRoomType();
    }
}
