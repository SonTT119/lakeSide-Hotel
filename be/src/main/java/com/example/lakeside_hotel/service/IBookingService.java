package com.example.lakeside_hotel.service;

import java.util.List;

import com.example.lakeside_hotel.model.BookedRoom;

public interface IBookingService {

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();

    List<BookedRoom> getBookingsByUserEmail(String email);

}
