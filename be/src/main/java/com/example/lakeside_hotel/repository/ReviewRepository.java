package com.example.lakeside_hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.lakeside_hotel.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r JOIN FETCH r.user WHERE r.room.id = :roomId")
    List<Review> findByRoomIdWithUser(Long roomId);

    @Query("SELECT r.rating FROM Review r WHERE r.room.id = :roomId")
    List<Integer> findRatingsByRoomId(Long roomId);

    List<Review> findByUserId(Long userId);

    List<Review> findByRating(int rating);

    long countByRoomId(Long roomId);
}
