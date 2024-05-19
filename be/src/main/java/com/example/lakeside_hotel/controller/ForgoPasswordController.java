package com.example.lakeside_hotel.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakeside_hotel.request.ForgotPasswordRequest;
import com.example.lakeside_hotel.service.implement.ForgotPasswordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/forgotPassword")
public class ForgoPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        forgotPasswordService.sendVerificationEmail(email);
        return ResponseEntity.ok("Email sent for verification");
    }

    // gửi lại email
    @PostMapping("/resendEmail/{email}")
    public ResponseEntity<?> resendEmail(@PathVariable String email) {
        forgotPasswordService.resendVerificationEmail(email);
        return ResponseEntity.ok("Email sent for verification");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        return ResponseEntity.ok(forgotPasswordService.verifyOtp(otp, email));
    }

    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ForgotPasswordRequest forgotPasswordRequest,
            @PathVariable String email) {
        forgotPasswordService.resetPassword(email, forgotPasswordRequest.getNewPassword(),
                forgotPasswordRequest.getConfirmPassword());
        return ResponseEntity.ok("Password updated successfully");
    }
}
