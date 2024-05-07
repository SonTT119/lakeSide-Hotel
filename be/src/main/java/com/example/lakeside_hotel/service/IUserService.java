package com.example.lakeside_hotel.service;

import java.util.List;
import java.util.Optional;

import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.JwtResponse;
import com.example.lakeside_hotel.request.LoginRequest;
import com.example.lakeside_hotel.request.UpdatePasswordRequest;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUserByEmail(String email);

    void saveUser(User existingUser);

    Optional<User> getUserById(Long userId);

    User updateUser(Long userId, String firstName, String lastName, String phone, String address);

    // void updatePassword(String email, String password);

    void updatePassword(UpdatePasswordRequest updatePasswordRequest);

    void deleteUserById(Long userId);

    // User getUserById(Long userId);
    void resetPasswordByEmail(String email, String password);

    JwtResponse authenticateUser(LoginRequest loginRequest);

    // count the number of users
    long countUsers();

    void updateAvatar(Long userId, byte[] photoBytes);

    byte[] getAvatarByUserId(Long userId);
}
