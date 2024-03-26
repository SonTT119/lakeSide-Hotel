package com.example.lakeside_hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lakeside_hotel.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByRoomId(Long roomId);

    List<Review> findByUserId(Long userId);

    List<Review> findByRating(int rating);
}
