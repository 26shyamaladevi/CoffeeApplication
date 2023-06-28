package com.example.CoffeeApp.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;

@Entity
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long oId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    @JsonIgnoreProperties("orderItems")
    private Orders orders;

    private long pId;

    private String pName;

    private double price;

    @NonNull
    private int quantity;

    public long getoId() {
        return oId;
    }

    public void setoId(long oId) {
        this.oId = oId;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public long getpId() {
        return pId;
    }

    public void setpId(long pId) {
        this.pId = pId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
