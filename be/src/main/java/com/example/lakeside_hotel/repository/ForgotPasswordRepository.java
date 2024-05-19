package com.example.lakeside_hotel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long> {

    // ForgotPassword findById(Integer otp);

    @Query("SELECT f FROM ForgotPassword f WHERE f.otp = ?1 AND f.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

    ForgotPassword findByUserId(Long id);

}
