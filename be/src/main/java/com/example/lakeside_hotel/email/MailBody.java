package com.example.lakeside_hotel.email;

import lombok.Builder;

// @Data
// @Builder
// public class MailBody {
// private String to;
// private String subject;
// private String text;

// public MailBody(String to, String subject, String text) {
// this.to = to;
// this.subject = subject;
// this.text = text;
// }

// }
@Builder
public record MailBody(String to, String subject, String text) {
}