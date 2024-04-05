package com.example.lakeside_hotel.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<List<Review>> getReviewsByRoomId(@PathVariable Long roomId) {
        List<Review> reviews = reviewService.getReviewsByRoomId(roomId);
        return ResponseEntity.ok(reviews);
    }

    // get all reviews
    @GetMapping("/get_all_reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userService.getUserByEmail(authentication.getName());
    }
}