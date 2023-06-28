package com.example.CoffeeApp.components;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.CoffeeApp.domains.Payment;
import com.example.CoffeeApp.repositories.PaymentRepo;

@Component
public class PaymentDataLoader implements CommandLineRunner {
    private final PaymentRepo paymentrepo;

    public PaymentDataLoader(PaymentRepo paymentrepo) {
        this.paymentrepo = paymentrepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // Hardcoded payment method values
        String[] paymentMethods = { "Credit Card", "Debit Card", "Cash", "Paypal" };

        for (String paymentMethod : paymentMethods) {
            Payment payment = new Payment();
            payment.setPaymentMethod(paymentMethod);

            // Save the payment method to the database
            paymentrepo.save(payment);
        }

    }
}
