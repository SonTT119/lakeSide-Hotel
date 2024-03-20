package com.example.lakeside_hotel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lakeside_hotel.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findByRoomId(Long roomId);

    List<BookedRoom> findByGuestEmail(String email);
}
