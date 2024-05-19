package com.example.lakeside_hotel.service;

import java.sql.SQLException;
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

    void deleteUserById(Long userId);

    // User getUserById(Long userId);
    void resetPasswordByEmail(String email, String password);

    JwtResponse authenticateUser(LoginRequest loginRequest);

    // count the number of users
    long countUsers();

    User updateAvatar(Long userId, byte[] avatarBytes) throws SQLException;

    byte[] getAvatarByUserId(Long userId) throws SQLException;

    User createUser(User user, String roleName);

    void updatePasswordById(Long userId, UpdatePasswordRequest updatePasswordRequest);
}
