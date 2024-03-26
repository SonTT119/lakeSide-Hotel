package com.example.lakeside_hotel.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdatePasswordRequest {
    @NotBlank
    private String newPassword;
    @NotBlank
    private String oldPassword;
}