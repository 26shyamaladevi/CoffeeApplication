package com.example.CoffeeApp.controllers;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.CoffeeApp.domains.Product;
import com.example.CoffeeApp.services.ProductService;

// Controller for managing product-related operations
// Handles requests related to products, such as retrieval, creation, update, and deletion

@RestController
public class ProductController {
    @Autowired
    private ProductService productservice;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        System.out.println(productservice.viewProducts());
        return ResponseEntity.ok(productservice.viewProducts());
    }

    @PostMapping("/products/add")
    public ResponseEntity<String> addNewProducts(@ModelAttribute Product product,
            @RequestParam("image") MultipartFile image) throws IOException {
        if (product.getid() == 0 && productservice.getpName(product.getproductName())) {
            productservice.addProduct(product, image);
            return ResponseEntity.ok("New Product" + product.getproductName() + " added successfully");
        } else {
            return ResponseEntity.badRequest().body("Product already exsist");
        }

    }

    @PutMapping("/products/update/{id}")
    public ResponseEntity<String> upadateProducts(@ModelAttribute Product product, @PathVariable Long id,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        boolean isId = productservice.getid(id);
        if (isId) {
            String msg = productservice.updateProduct(product, image);
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
