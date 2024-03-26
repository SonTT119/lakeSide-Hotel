package com.example.lakeside_hotel.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.exception.ResourceNotFoundException;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.UserResponse;
import com.example.lakeside_hotel.request.UpdatePasswordRequest;
import com.example.lakeside_hotel.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping("/all-users")
    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    // get user by email
    @GetMapping("/{email}")
    // @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

    // get user by id
    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<UserResponse>> getUserById(@PathVariable Long userId) {
        Optional<User> theUser = userService.getUserById(userId);
        return theUser.map(user -> {
            UserResponse userResponse = getUserResponse(user);
            return ResponseEntity.ok(Optional.of(userResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

    }

    @DeleteMapping("/delete/{email}")
    // @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email ==
    // principal.username)")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }

    // delete user by id
    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
        try {
            if (!userService.getUserById(userId).isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            if (userService.getUserById(userId).get().getRoles().stream()
                    .anyMatch(role -> role.getName().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admin user cannot be deleted");
            }
            userService.deleteUserById(userId);
            return ResponseEntity.ok("User deleted successfully");

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }

    // @PutMapping("/update/{email}")
    // @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email ==
    // principal.username)")
    // public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody
    // User updatedUser) {
    // try {
    // User existingUser = userService.getUserByEmail(email);
    // existingUser.setFirstName(updatedUser.getFirstName());
    // existingUser.setLastName(updatedUser.getLastName());
    // // Update other fields as necessary

    // userService.saveUser(existingUser);
    // return ResponseEntity.ok(existingUser);
    // } catch (UsernameNotFoundException e) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error
    // updating user");
    // }
    // }

    @PutMapping("/update/{userId}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long userId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email) {

        try {
            User updatedUser = userService.updateUser(userId, firstName, lastName, email);
            UserResponse userResponse = new UserResponse(updatedUser.getId(), updatedUser.getFirstName(),
                    updatedUser.getLastName(), updatedUser.getEmail());
            return ResponseEntity.ok(userResponse);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // User not found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Other errors
        }
    }

    private UserResponse getUserResponse(User existingUser) {
        return new UserResponse(existingUser.getId(), existingUser.getFirstName(), existingUser.getLastName(),
                existingUser.getEmail());
    }

    // update password
    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        try {
            userService.updatePassword(updatePasswordRequest);
            return ResponseEntity.ok("Password updated successfully");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password");
        }
    }
}
