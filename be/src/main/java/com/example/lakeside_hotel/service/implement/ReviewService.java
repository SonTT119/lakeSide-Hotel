package com.example.lakeside_hotel.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.model.Review;
import com.example.lakeside_hotel.model.Room;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.repository.ReviewRepository;
import com.example.lakeside_hotel.service.IReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public List<Review> getReviewsByRoomId(Long roomId) {
        return reviewRepository.findByRoomId(roomId);
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Review updateReview(Long reviewId, String comment, int rating) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review addReview(Long userId, Long roomId, String comment, int rating) {
        Review review = new Review();
        User user = new User();
        user.setId(userId);
        Room room = new Room();
        room.setId(roomId);
        review.setUser(user);
        review.setRoom(room);
        review.setComment(comment);
        review.setRating(rating);
        return reviewRepository.save(review);
    }

}
