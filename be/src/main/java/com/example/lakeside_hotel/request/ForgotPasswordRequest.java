package com.example.lakeside_hotel.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
    @NotBlank
    private String newPassword;
    @NotBlank
    private String confirmPassword;
}
