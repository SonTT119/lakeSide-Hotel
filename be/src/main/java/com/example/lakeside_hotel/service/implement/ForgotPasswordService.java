package com.example.lakeside_hotel.service.implement;

import org.springframework.stereotype.Service;

import com.example.lakeside_hotel.model.ForgotPassword;
import com.example.lakeside_hotel.model.User;
import com.example.lakeside_hotel.repository.ForgotPasswordRepository;
import com.example.lakeside_hotel.service.IForgotPasswordService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService implements IForgotPasswordService {
    private final ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public void save(ForgotPassword forgotPassword) {
        forgotPasswordRepository.save(forgotPassword);
    }

    @Override
    public ForgotPassword getForgotPasswordByOtpAndUser(Integer otp, User user) {
        return forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + user.getEmail()));
    }

    @Override
    public void deleteById(Long id) {
        forgotPasswordRepository.deleteById(id);
    }

    // @Override
    // public ForgotPassword getForgotPasswordByOtp(Integer otp) {
    // return forgotPasswordRepository.findById(otp);
    // }

}
