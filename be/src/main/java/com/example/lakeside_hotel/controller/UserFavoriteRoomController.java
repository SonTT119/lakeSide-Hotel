package com.example.lakeside_hotel.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.exception.ResourceNotFoundException;
import com.example.lakeside_hotel.model.UserFavoriteRoom;
import com.example.lakeside_hotel.reponse.UserFavoriteRoomResponse;
import com.example.lakeside_hotel.service.IUserFavoriteRoomService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-favorite-room")
public class UserFavoriteRoomController {
    private final IUserFavoriteRoomService userFavoriteRoomService;

    // gọi tât cả các phòng yêu thích của user
    @GetMapping("/user/{email}")
    // public ResponseEntity<List<UserFavoriteRoom>>
    // getAllFavoriteRoomsByUserId(@PathVariable Long userId) {
    // List<UserFavoriteRoom> userFavoriteRooms =
    // userFavoriteRoomService.getAllFavoriteRoomsByUserId(userId);
    // return ResponseEntity.ok(userFavoriteRooms);
    // }
    public ResponseEntity<List<UserFavoriteRoomResponse>> getAllFavoriteRoomsByUserId(@PathVariable String email) {
        List<UserFavoriteRoom> userFavoriteRooms = userFavoriteRoomService.getAllFavoriteRoomsByUserId(email);
        return ResponseEntity.ok(userFavoriteRooms.stream().map(this::getUserFavoriteRoomResponse).toList());
    }

    // thêm 1 phòng vào danh sách yêu thích của user
    @PostMapping("/add-room/{roomId}/user/{email}")
    public ResponseEntity<?> addRoomToFavoriteList(@PathVariable Long roomId,
            @PathVariable String email) {
        // Check if the room is already in the user's favorite list
        if (userFavoriteRoomService.isRoomInFavoriteList(roomId, email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Room already in favorite list");
        }
        UserFavoriteRoom userFavoriteRoom = userFavoriteRoomService.addRoomToFavoriteList(roomId, email);
        return ResponseEntity.ok(userFavoriteRoom);
    }

    // xóa 1 phòng khỏi danh sách yêu thích của user
    @DeleteMapping("/remove-room/{roomId}/user/{email}")
    public ResponseEntity<?> removeRoomFromFavoriteList(@PathVariable Long roomId, @PathVariable String email) {
        try {
            userFavoriteRoomService.removeRoomFromFavoriteList(roomId, email);
            return ResponseEntity.ok("Room removed from favorite list");
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    private UserFavoriteRoomResponse getUserFavoriteRoomResponse(UserFavoriteRoom userFavoriteRoom) {
        return new UserFavoriteRoomResponse(userFavoriteRoom.getId(), userFavoriteRoom.getUser().getId(),
                userFavoriteRoom.getRoom().getId());
    }

}
