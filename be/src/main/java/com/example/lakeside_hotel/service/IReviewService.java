package com.example.lakeside_hotel.service;

import java.util.List;

import com.example.lakeside_hotel.model.Review;

public interface IReviewService {
    List<Review> getReviewsByRoomId(Long roomId);

    List<Review> getReviewsByUserId(Long userId);

    void deleteReview(Long reviewId);

    Review updateReview(Long reviewId, String comment, int rating);

    List<Review> getAllReviews();

    Review addReview(Long userId, Long roomId, String comment, int rating);

    double calculateAverageRating(Long roomId);

    long getReviewCount(Long roomId);
}
