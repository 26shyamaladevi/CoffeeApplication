package com.example.CoffeeApp.domains;

import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @Column(length = 8)
    private long id;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private double price;

    public long getid() {
        return id;
    }

    public void setid(long id) {
        this.id = id;
    }

    public String getproductName() {
        return productName;
    }

    public void setproductName(String productName) {
        this.productName = productName;
    }

    public double getprice() {
        return price;
    }

    public void setprice(double price) {
        this.price = price;
    }

    public Product orElseThrow(Object object) {
        return null;
    }

}
