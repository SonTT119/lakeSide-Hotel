package com.example.lakeside_hotel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.model.Review;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.ReviewResponse;
import com.example.lakeside_hotel.service.IReviewService;
import com.example.lakeside_hotel.service.IRoomService;
import com.example.lakeside_hotel.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final IReviewService reviewService;
    private final IUserService userService;
    private final IRoomService roomService;

    // create a new review
    @PostMapping("/add_review/room/{roomId}")
    public ResponseEntity<ReviewResponse> addReview(@PathVariable Long roomId,
            @RequestBody Review review) {

        Review savedReview = reviewService.addReview(getCurrentUser().getId(), roomId, review.getComment(),
                review.getRating());
        ReviewResponse reviewResponse = new ReviewResponse(savedReview.getReviewId(), savedReview.getComment(),
                savedReview.getRating());
        return ResponseEntity.ok(reviewResponse);
    }

    // get all reviews by room id
    @GetMapping("/get_reviews_by_room_id/{roomId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByRoomId(@PathVariable Long roomId) {
        List<Review> reviews = reviewService.getReviewsByRoomId(roomId);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponse reviewResponse = getReviewResponse(review);
            reviewResponses.add(reviewResponse);
        }
        return ResponseEntity.ok(reviewResponses);
    }

    // get rating average by room id
    @GetMapping("/get_rating_average_by_room_id/{roomId}")
    public ResponseEntity<Double> getRatingAverageByRoomId(@PathVariable Long roomId) {
        double averageRating = reviewService.calculateAverageRating(roomId);
        return ResponseEntity.ok(averageRating);
    }

    // get review count by room id
    @GetMapping("/get_review_count_by_room_id/{roomId}")
    public ResponseEntity<Long> getReviewCountByRoomId(@PathVariable Long roomId) {
        long reviewCount = reviewService.getReviewCount(roomId);
        return ResponseEntity.ok(reviewCount);
    }

    // get all reviews
    @GetMapping("/get_all_reviews")
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponse reviewResponse = getReviewResponse(review);
            reviewResponse.setRoomId(review.getRoom().getId().toString());
            reviewResponse.setRoomType(review.getRoom().getRoomType());
            reviewResponses.add(reviewResponse);
        }
        return ResponseEntity.ok(reviewResponses);
    }

    // get all reviews by user id
    @GetMapping("/users/{userId}/reviews")
    public ResponseEntity<List<ReviewResponse>> getReviewsByUser(@PathVariable Long userId) {
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponse reviewResponse = new ReviewResponse(review.getReviewId(), review.getComment(),
                    review.getRating(), review.getUser(), review.getRoom());
            reviewResponses.add(reviewResponse);
        }
        return ResponseEntity.ok(reviewResponses);
    }

    // get review by review id
    @GetMapping("/get_review/{reviewId}")
    public ResponseEntity<ReviewResponse> getReview(@PathVariable Long reviewId) {
        Review review = reviewService.getReview(reviewId);
        ReviewResponse reviewResponse = new ReviewResponse(review.getReviewId(), review.getComment(),
                review.getRating(), review.getUser(), review.getRoom());
        return ResponseEntity.ok(reviewResponse);
    }

    // delete review by review id
    @DeleteMapping("/delete_review/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }

    // edit review by review id
    @PutMapping("/update_review/{reviewId}")
    public ResponseEntity<ReviewResponse> editReview(@PathVariable Long reviewId, @RequestBody Review review) {
        Review savedReview = reviewService.updateReview(reviewId, review.getComment(), review.getRating());
        ReviewResponse reviewResponse = new ReviewResponse(savedReview.getReviewId(), savedReview.getComment(),
                savedReview.getRating());
        return ResponseEntity.ok(reviewResponse);
    }

    // get all count reviews
    @GetMapping("/get_all_count_reviews")
    public ResponseEntity<Long> getAllCountReviews() {
        long count = reviewService.getAllReviews().size();
        return ResponseEntity.ok(count);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getUserByEmail(authentication.getName());
    }

    private ReviewResponse getReviewResponse(Review review) {
        return new ReviewResponse(review.getReviewId(), review.getComment(), review.getRating(), review.getUser());
    }
}