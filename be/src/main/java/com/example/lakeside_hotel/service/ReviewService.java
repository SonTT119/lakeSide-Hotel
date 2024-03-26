package com.example.lakeside_hotel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.model.Review;
import com.example.lakeside_hotel.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public void deleteReview(Long reviewId) {
        Optional<Review> theReview = reviewRepository.findById(reviewId);
        if (theReview.isEmpty()) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review getReviewById(Long reviewId) {
        Optional<Review> theReview = reviewRepository.findById(reviewId);
        if (theReview.isEmpty()) {
            throw new RuntimeException("Review not found");
        }
        return theReview.get();
    }

    @Override
    public List<Review> getReviewsByRating(int rating) {
        return reviewRepository.findByRating(rating);
    }

    @Override
    public List<Review> getReviewsByRoom(Long roomId) {
        return reviewRepository.findByRoomId(roomId);
    }

    @Override
    public List<Review> getReviewsByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    @Override
    public Review updateReview(Long reviewId, int rating, String comment) {
        Optional<Review> theReview = reviewRepository.findById(reviewId);
        if (theReview.isEmpty()) {
            throw new RuntimeException("Review not found");
        }
        Review review = theReview.get();
        review.setRating(rating);
        review.setComment(comment);
        return reviewRepository.save(review);
    }

    @Override
    public Review savaReview(Review review) {
        Review newReview = reviewRepository.save(review);
        return newReview;
    }

}
