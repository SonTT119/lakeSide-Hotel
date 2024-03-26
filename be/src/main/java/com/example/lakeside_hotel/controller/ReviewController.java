package com.example.lakeside_hotel.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.model.Review;
import com.example.lakeside_hotel.service.IReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final IReviewService reviewService;

    // người dùng tạo 1 review đối với 1 phòng
    @PostMapping("/save-review")
    public Review saveReview(@RequestBody Review review) {
        return reviewService.savaReview(review);
    }

    @GetMapping("/get-all-reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    // get review by id
    @GetMapping("/get-review/{reviewId}")
    public ResponseEntity<Review> getReviewById(@RequestParam Long reviewId) {
        Review review = reviewService.getReviewById(reviewId);
        return ResponseEntity.ok(review);
    }

    // get reviews room by id room
    @GetMapping("/get-reviews/room/{roomId}")
    public ResponseEntity<List<Review>> getReviewsByRoom(@PathVariable Long roomId) {
        List<Review> reviews = reviewService.getReviewsByRoom(roomId);
        return ResponseEntity.ok(reviews);
    }

    // get reviews by user id
    @GetMapping("/get-reviews/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        List<Review> reviews = reviewService.getReviewsByUser(userId);
        return ResponseEntity.ok(reviews);
    }

    // get reviews by rating
    @GetMapping("/get-reviews/rating/{rating}")
    public ResponseEntity<List<Review>> getReviewsByRating(@PathVariable int rating) {
        List<Review> reviews = reviewService.getReviewsByRating(rating);
        return ResponseEntity.ok(reviews);
    }

    // update review for user
    @PutMapping("/update-review/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestParam int rating,
            @RequestParam String comment) {
        Review review = reviewService.updateReview(reviewId, rating, comment);
        return ResponseEntity.ok(review);
    }

    // delete review by id
    @GetMapping("/delete-review/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

}
