package com.example.CoffeeApp.domains;

import jakarta.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pid;

    private String paymentMethod;

    public long getId() {
        return pid;
    }

    public void setId(long id) {
        this.pid = id;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

}
