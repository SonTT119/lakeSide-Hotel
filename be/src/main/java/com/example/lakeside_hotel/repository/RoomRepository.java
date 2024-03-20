package com.example.lakeside_hotel.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.lakeside_hotel.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query("""
            SELECT r FROM Room r \
            WHERE r.roomType LIKE %:roomType% \
            AND r.id NOT IN (\
            SELECT b.room.id FROM BookedRoom b \
            WHERE ((b.checkInDate <= :checkOutDate) AND (b.checkOutDate >= :checkInDate))\
            )\
            """)
    List<Room> findAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

}
