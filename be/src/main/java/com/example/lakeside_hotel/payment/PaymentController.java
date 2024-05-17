package com.example.lakeside_hotel.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/vn-pay")
    public ResponseEntity<PaymentDTO.VNPayResponse> createVnPayPayment(@RequestParam("amount") String amount,
            @RequestParam(value = "bankCode", required = false) String bankCode, HttpServletRequest request) {
        request.setAttribute("amount", amount);
        if (bankCode != null) {
            request.setAttribute("bankCode", bankCode);
        }
        PaymentDTO.VNPayResponse response = paymentService.createVnPayPayment(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vn-pay/callback")
    public ResponseEntity<PaymentDTO.VNPayResponse> vnPayCallback(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return ResponseEntity.ok(PaymentDTO.VNPayResponse.builder().code("00").message("success").build());
        }
        return ResponseEntity.ok(PaymentDTO.VNPayResponse.builder().code("01").message("fail").build());
    }
}
