package com.example.CoffeeApp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.example.CoffeeApp.domains.Payment;

import com.fasterxml.jackson.databind.ser.impl.StringArraySerializer;

public interface PaymentRepo extends CrudRepository<Payment, StringArraySerializer> {

    Payment findByPaymentMethod(String string);

    List<Payment> findAll();

}
