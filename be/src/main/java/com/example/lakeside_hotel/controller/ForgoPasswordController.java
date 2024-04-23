package com.example.lakeside_hotel.controller;

import java.time.Instant;
import java.util.Date;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.email.IEmailService;
import com.example.lakeside_hotel.email.MailBody;
import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.request.ForgotPasswordRequest;
import com.example.lakeside_hotel.service.IForgotPasswordService;
import com.example.lakeside_hotel.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/forgotPassword")
public class ForgoPasswordController {

    private final IUserService userService;

    private final IEmailService emailService;

    private final IForgotPasswordService forgotPasswordService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        if (!isValidEmail(email)) {
            return ResponseEntity.badRequest().body("Invalid email address");
        }
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        Integer otp = otpGenerator();
        MailBody mailBody = MailBody.builder().to(email)
                .subject("OTP for Forgot Password request")
                .text("This is the OTP for your Forgot Password request: " + otp)
                .build();
        ForgotPassword forgotPassword = new ForgotPassword();
        forgotPassword.setOtp(otp);
        forgotPassword.setExpiryDate(new Date(System.currentTimeMillis() + 70 * 1000));
        forgotPassword.setUser(user);
        forgotPasswordService.save(forgotPassword);
        emailService.sendSimpleMessage(mailBody);
        return ResponseEntity.ok("Email sent for verification");
    }

    // Validate email address format
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        ForgotPassword forgotPassword = forgotPasswordService.getForgotPasswordByOtpAndUser(otp, user);
        if (forgotPassword == null) {
            return new ResponseEntity<>("Invalid OTP", HttpStatus.EXPECTATION_FAILED);
        }
        if (forgotPassword.getExpiryDate().before(Date.from(Instant.now()))) {
            forgotPasswordService.deleteById(forgotPassword.getId());
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }
        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/updatePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ForgotPasswordRequest forgotPasswordRequest,
            @PathVariable String email) {
        if (!forgotPasswordRequest.getNewPassword().equals(forgotPasswordRequest.getConfirmPassword())) {
            return new ResponseEntity<>("Please enter the same password in both fields", HttpStatus.BAD_REQUEST);
        }
        String encodedPassword = passwordEncoder.encode(forgotPasswordRequest.getNewPassword());
        userService.updatePasswordByEmail(email, encodedPassword);
        // userService.updatePasswordByEmail(email,
        // forgotPasswordRequest.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
