package com.example.CoffeeApp.domains;

import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @Column(length = 8)
    private long id;

    @Column(nullable = false)
    private String productName;

    private String description;

    @Column(nullable = false)
    private double price;

    @Lob
    @Column(name = "imagedata", length = 1000)
    private byte[] imageData;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

}
