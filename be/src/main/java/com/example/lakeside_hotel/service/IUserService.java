package com.example.lakeside_hotel.service;

import java.util.List;
import java.util.Optional;

import com.example.lakeside_hotel.model.User;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUserByEmail(String email);

    void saveUser(User existingUser);

    Optional<User> getUserById(Long userId);

    User updateUser(Long userId, String firstName, String lastName, String email);

    // User getUserById(Long userId);
}
