package com.example.lakeside_hotel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.exception.UserAlreadyExistException;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.reponse.JwtResponse;
import com.example.lakeside_hotel.request.LoginRequest;
import com.example.lakeside_hotel.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IUserService userService;
    // private final AuthenticationManager authenticationManager;
    // private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest
    // loginRequest) {
    // try {
    // // Lấy thông tin người dùng từ yêu cầu đăng nhập
    // String email = loginRequest.getEmail();
    // String password = loginRequest.getPassword();

    // // Xác thực người dùng với mật khẩu mới
    // Authentication authenticateAction = authenticationManager.authenticate(
    // new UsernamePasswordAuthenticationToken(email, password));
    // SecurityContextHolder.getContext().setAuthentication(authenticateAction);

    // // Tạo mã thông báo JWT mới với mật khẩu mới
    // String jwt = jwtUtils.generateJwtTokenForUser(authenticateAction);
    // HotelUserDetail userDetails = (HotelUserDetail)
    // authenticateAction.getPrincipal();
    // List<String> roles = userDetails.getAuthorities().stream().map(item ->
    // item.getAuthority())
    // .collect(Collectors.toList());

    // // Trả về mã thông báo JWT mới và thông tin người dùng
    // return ResponseEntity.ok(new JwtResponse(userDetails.getId(),
    // userDetails.getEmail(), jwt, roles));
    // } catch (BadCredentialsException e) {
    // // Handle incorrect email or password
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email
    // or password");
    // } catch (AccessDeniedException e) {
    // // Handle unauthorized access
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    // .body("You are not authorized to access this resource");
    // }
    // }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }
}
