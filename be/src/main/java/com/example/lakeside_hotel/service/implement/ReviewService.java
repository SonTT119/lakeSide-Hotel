package com.example.lakeside_hotel.service.implement;

import java.util.List;
import java.util.Optional;

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
    private final RoomService roomService;

    @Override
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public List<Review> getReviewsByRoomId(Long roomId) {
        return reviewRepository.findByRoomIdWithUser(roomId);
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        List<Review> reviews = reviewRepository.findByUserId(userId);
        if (reviews != null) {
            for (Review review : reviews) {
                Optional<Room> room = roomService.getRoomById(review.getRoom().getId());
                review.setRoom(room.get());
            }
        }
        return reviews;
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
    public double calculateAverageRating(Long roomId) {
        List<Integer> ratings = reviewRepository.findRatingsByRoomId(roomId);
        int size = ratings.size();
        if (size == 0) {
            return 0.0;
        }
        double sum = 0;
        for (int rating : ratings) {
            sum += rating;
        }
        double average = sum / size;

        // Sử dụng String.format để giới hạn đến 2 chữ số thập phân
        return Double.parseDouble(String.format("%.2f", average));
    }

    @Override
    public long getReviewCount(Long roomId) {
        return reviewRepository.countByRoomId(roomId);
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
