package com.example.CoffeeApp.repositories;

import com.example.CoffeeApp.domains.Product;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Serializable> {
    boolean existsById(long id);
}
