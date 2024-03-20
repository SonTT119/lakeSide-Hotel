package com.example.lakeside_hotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lakeside_hotel.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
