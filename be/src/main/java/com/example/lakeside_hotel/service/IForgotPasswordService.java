package com.example.lakeside_hotel.service;

import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;

public interface IForgotPasswordService {

    void save(ForgotPassword forgotPassword);

    // ForgotPassword getForgotPasswordByOtp(Integer otp);

    ForgotPassword getForgotPasswordByOtpAndUser(Integer otp, User user);

    void deleteById(Long id);

}
