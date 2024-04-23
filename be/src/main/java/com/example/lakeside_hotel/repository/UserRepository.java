package com.example.lakeside_hotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.lakeside_hotel.model.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.password = ?2 WHERE u.email = ?1")
    void updatePasswordByEmail(String email, String password);

}
