package com.example.lakeside_hotel.service;

import java.util.List;

import com.example.lakeside_hotel.model.Review;

public interface IReviewService {

    List<Review> getAllReviews();

    Review getReviewById(Long reviewId);

    List<Review> getReviewsByRoom(Long roomId);

    List<Review> getReviewsByUser(Long userId);

    List<Review> getReviewsByRating(int rating);

    Review updateReview(Long reviewId, int rating, String comment);

    void deleteReview(Long reviewId);

    Review savaReview(Review review);

}
