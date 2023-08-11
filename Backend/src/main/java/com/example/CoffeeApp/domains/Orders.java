package com.example.CoffeeApp.domains;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User customer;

    private String customerEmailId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orders")
    private List<OrderItems> orderItems;

    private double totalPrice;

    private String paymentMethod;

    @CreatedDate
    private Instant orderDate;

    @JsonFormat(pattern = "MM/dd/yyyy HH:mm:ss", timezone = "UTC")
    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public String getCustomerEmailId() {
        return customerEmailId;
    }

    public void setCustomerEmailId(String customerEmailId) {
        this.customerEmailId = customerEmailId;
    }

    public List<OrderItems> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItems> orderItems) {
        this.orderItems = orderItems;
        for (OrderItems item : orderItems) {
            item.setOrders(this); // Set the bidirectional relationship
        }
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // Method to return orderDate as a formatted string in JSON format
    public String getFormattedOrderDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm:ss a").withZone(ZoneId.of("UTC"));
        return orderDate.atZone(ZoneId.systemDefault()).format(formatter);
    }

    @PrePersist
    protected void onCreate() {
        orderDate = Instant.now();

    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Orders{");
        sb.append("orderId=").append(orderId);
        sb.append(", customer=").append(customer);
        // sb.append(", customerEmailId='").append(customerEmailId).append('\'');
        sb.append(", orderItems=").append(orderItems);
        sb.append(", totalPrice=").append(totalPrice);
        sb.append(", orderDate=").append(orderDate);
        sb.append(", paymentMethod='").append(paymentMethod).append('\'');
        sb.append('}');
        return sb.toString();
    }

}
