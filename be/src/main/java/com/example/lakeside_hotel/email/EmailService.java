package com.example.lakeside_hotel.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private final JavaMailSender javaMailSender;

    public void sendSimpleMessage(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        // message.setTo(mailBody.getTo());
        // message.setFrom("");
        // message.setSubject(mailBody.getSubject());
        // message.setText(mailBody.getText());
        // javaMailSender.send(message);

        message.setTo(mailBody.to());
        message.setFrom("thanhhTuu@gmail.com");
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());
        javaMailSender.send(message);
    }

}
