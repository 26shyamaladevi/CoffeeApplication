package com.example.CoffeeApp.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.CoffeeApp.domains.Product;
import com.example.CoffeeApp.services.ProductService;

// Controller for managing product-related operations
// Handles requests related to products, such as retrieval, creation, update, and deletion

@RestController
public class ProductController {
    @Autowired
    private ProductService productservice;

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productservice.viewProducts();
    }

    @PostMapping("/products/add")
    public String addNewProducts(@RequestBody Product product) {
        if (product.getid() == 0 && productservice.getpName(product.getproductName())) {
            productservice.addProduct(product);
            return "New Product" + product.getproductName() + " added successfully";
        }

        else {
            return "Product already exsists, Please update it.";
        }

    }

    @PutMapping("/products/update")
    public ResponseEntity<String> upadateProducts(@RequestBody Product product) {
        boolean isId = productservice.getid(product.getid());
        if (isId) {
            String msg = productservice.updateProduct(product);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);

        } else {
            // Return custom error response with 404 status code
            String errorMsg = "Cannot update because the product with id " + product.getid() + " does not exist";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg);
        }
    }

    @DeleteMapping("/products/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean deleted = productservice.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
