package com.example.lakeside_hotel.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.exception.ResourceNotFoundException;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.model.UserFavoriteRoom;
import com.example.lakeside_hotel.repository.RoomRepository;
import com.example.lakeside_hotel.repository.UserFavoriteRoomRepository;
import com.example.lakeside_hotel.repository.UserRepository;
import com.example.lakeside_hotel.service.IUserFavoriteRoomService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserFavoriteRoomService implements IUserFavoriteRoomService {
    private final UserFavoriteRoomRepository userFavoriteRoomRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Override
    public List<UserFavoriteRoom> getAllFavoriteRoomsByUserId(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userFavoriteRoomRepository.findByUserId(user.getId());
    }

    // @Override
    // public void removeRoomFromFavoriteList(Long roomId, Long userId) {
    // User user = userRepository.findById(userId).orElseThrow(() -> new
    // ResourceNotFoundException("User not found"));
    // userFavoriteRoomRepository.deleteByRoomIdAndUserId(roomId, user);
    // }

    @Override
    public UserFavoriteRoom addRoomToFavoriteList(Long roomId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserFavoriteRoom userFavoriteRoom = new UserFavoriteRoom();
        userFavoriteRoom.setUser(user);
        userFavoriteRoom.setRoom(roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
        return userFavoriteRoomRepository.save(userFavoriteRoom);
    }

    // @Override
    // public void removeRoomFromFavoriteList(Long roomId, String email) {
    // User user = userRepository.findByEmail(email)
    // .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    // userFavoriteRoomRepository.deleteByRoomIdAndUserId(roomId, user.getId());
    // }

    @Override
    public boolean isRoomInFavoriteList(Long roomId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userFavoriteRoomRepository.existsByUserIdAndRoomId(user.getId(), roomId);
    }

    @Override
    public void removeRoomFromFavoriteList(Long roomId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        UserFavoriteRoom userFavoriteRoom = userFavoriteRoomRepository.findByUserIdAndRoomId(user.getId(), roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        userFavoriteRoomRepository.delete(userFavoriteRoom);
    }

}
