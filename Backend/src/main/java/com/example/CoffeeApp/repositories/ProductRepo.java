package com.example.CoffeeApp.repositories;

import com.example.CoffeeApp.domains.Product;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Serializable> {
    boolean existsById(long id);

}
