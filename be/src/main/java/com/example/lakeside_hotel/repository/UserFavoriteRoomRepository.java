package com.example.lakeside_hotel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lakeside_hotel.model.UserFavoriteRoom;

public interface UserFavoriteRoomRepository extends JpaRepository<UserFavoriteRoom, Long> {

    List<UserFavoriteRoom> findByUserId(Long userId);

    // void deleteByRoomIdAndUserId(Long roomId, Long userId);

    boolean existsByUserIdAndRoomId(Long userId, Long roomId);

    void delete(UserFavoriteRoom userFavoriteRoom);

    Optional<UserFavoriteRoom> findByUserIdAndRoomId(Long id, Long roomId);

}