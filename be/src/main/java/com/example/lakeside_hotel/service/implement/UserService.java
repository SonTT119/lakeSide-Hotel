package com.example.lakeside_hotel.service.implement;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.exception.UserAlreadyExistException;
import com.example.lakeside_hotel.model.Role;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.repository.RoleRepository;
import com.example.lakeside_hotel.repository.UserRepository;
import com.example.lakeside_hotel.request.UpdatePasswordRequest;
import com.example.lakeside_hotel.service.IUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUserByEmail(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + email + " not found"));
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistException(user.getEmail() + " already exists");
        }

        // check if the password equals the confirm password
        String password = user.getPassword();
        String confirmPassword = user.getConfirmPassword();
        if (!password.equals(confirmPassword)) {
            throw new UserAlreadyExistException("Passwords do not match");
        }

        String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (!password.matches(passwordPattern)) {
            throw new UserAlreadyExistException(
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character and no whitespace");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public void saveUser(User existingUser) {
        userRepository.save(existingUser);

    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User updateUser(Long userId, String firstName, String lastName, String email) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new NoSuchElementException("No user found with id " + userId));

        if (firstName != null) {
            user.setFirstName(firstName);
        }

        if (lastName != null) {
            user.setLastName(lastName);
        }

        if (email != null) {
            user.setEmail(email);
        }

        userRepository.save(user);
        return user;
    }

    @Override
    public void updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        User currentUser = getCurrentUserLogin();
        String currentPassword = new String(updatePasswordRequest.getOldPassword());
        if (!passwordEncoder.matches(currentPassword, currentUser.getPassword())) {
            throw new UserAlreadyExistException("Wrong credentials!");
        }

        String newPassword = new String(updatePasswordRequest.getNewPassword());
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(currentUser);

    }

    private User getCurrentUserLogin() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByEmail(email);
    }

    @Override
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

}
