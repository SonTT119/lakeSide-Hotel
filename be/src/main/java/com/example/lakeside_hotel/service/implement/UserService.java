package com.example.lakeside_hotel.service.implement;

import java.sql.Blob;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.exception.UserAlreadyExistException;
import com.example.lakeside_hotel.model.Role;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.JwtResponse;
import com.example.lakeside_hotel.repository.RoleRepository;
import com.example.lakeside_hotel.repository.UserRepository;
import com.example.lakeside_hotel.request.LoginRequest;
import com.example.lakeside_hotel.request.UpdatePasswordRequest;
import com.example.lakeside_hotel.security.jwt.JwtUtils;
import com.example.lakeside_hotel.security.user.HotelUserDetail;
import com.example.lakeside_hotel.service.IUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

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
        // user.setPassword(user.getPassword());
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
    public User updateUser(Long userId, String firstName, String lastName, String phone, String address) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new NoSuchElementException("No user found with id " + userId));

        if (firstName != null) {
            user.setFirstName(firstName);
        }

        if (lastName != null) {
            user.setLastName(lastName);
        }

        if (phone != null) {
            if (phone.length() != 10) {
                throw new IllegalArgumentException("Phone number must have exactly 10 digits");
            }
            user.setPhone(phone);
        }

        if (address != null) {
            user.setAddress(address);
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
        String confirmPassword = new String(updatePasswordRequest.getConfirmPassword());
        if (!newPassword.equals(confirmPassword)) {
            throw new UserAlreadyExistException("New password and confirmation password do not match");
        }

        String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new UserAlreadyExistException(
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character and no whitespace");
        }

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

    @Override
    public void resetPasswordByEmail(String email, String newPassword) {

        User user = getUserByEmail(email);

        // check pattern of password
        String passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new UserAlreadyExistException(
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character and no whitespace");
        }
        // user.setPassword(passwordEncoder.encode(newPassword));
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        try {
            // Authenticate user
            Authentication authenticateAction = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)); // Authenticate user with email and
                                                                               // password
            // Set authentication in security context
            SecurityContextHolder.getContext().setAuthentication(authenticateAction);

            // Generate JWT token
            String jwt = jwtUtils.generateJwtTokenForUser(authenticateAction);
            HotelUserDetail userDetails = (HotelUserDetail) authenticateAction.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            // Return JWT token and user details
            return new JwtResponse(userDetails.getId(), userDetails.getEmail(), jwt, roles);
        } catch (BadCredentialsException e) {
            throw new AccessDeniedException("Incorrect email or password");
        } catch (Exception e) {
            throw new AccessDeniedException("You are not authorized to access this resource");
        }
    }

    @Override
    public long countUsers() {
        return userRepository.count();
    }

    @Override
    public void updateAvatar(Long userId, byte[] photoBytes) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("No user found with id " + userId));
        user.setAvatar(photoBytes);
        userRepository.save(user);
    }

    @Override
    public byte[] getAvatarByUserId(Long userId) {
        Optional<User> theUser = userRepository.findById(userId);
        if (theUser.isEmpty()) {
            throw new NoSuchElementException("No user found with id " + userId);
        }
        Blob photoBlob = null;
        byte[] photoBytes = theUser.get().getAvatar();
        if (photoBytes != null) {
            try {
                photoBlob = new SerialBlob(photoBytes);
                return photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (Exception e) {
                throw new UserAlreadyExistException("Error retrieving photo");
            }
        }
        return photoBytes;
    }

}
