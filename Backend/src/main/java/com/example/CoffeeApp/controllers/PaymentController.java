package com.example.CoffeeApp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.CoffeeApp.domains.Payment;
import com.example.CoffeeApp.repositories.PaymentRepo;
import java.util.List;

@RestController
public class PaymentController {
    private final PaymentRepo paymentRepo;

    public PaymentController(PaymentRepo paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    @GetMapping("/payments")
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();

    }
}
