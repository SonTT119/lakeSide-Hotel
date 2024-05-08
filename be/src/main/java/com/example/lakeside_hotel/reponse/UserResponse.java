package com.example.lakeside_hotel.reponse;

import org.apache.tomcat.util.codec.binary.Base64;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;

    private String avatar;

    public UserResponse(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public UserResponse(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public UserResponse(Long id, String firstName, String lastName, String phone, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
    }

    public UserResponse(Long id, byte[] avatarBytes) {
        this.id = id;
        this.avatar = avatarBytes != null ? Base64.encodeBase64String(avatarBytes) : null;
    }

    public UserResponse(Long id, String firstName, String lastName, String email, String phone, String address,
            byte[] avatarBytes) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.avatar = avatarBytes != null ? Base64.encodeBase64String(avatarBytes) : null;
    }

}
