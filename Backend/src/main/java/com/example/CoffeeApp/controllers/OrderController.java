package com.example.CoffeeApp.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CoffeeApp.domains.OrderItems;
import com.example.CoffeeApp.domains.Orders;
import com.example.CoffeeApp.services.OrderService;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    // ViewOrders
    @GetMapping("orders/{orderId}")
    public List<OrderItems> getOrders(@PathVariable("orderId") Long orderId) {
        return orderService.viewOrders(orderId);
    }

    // CreateOrder
    @PostMapping("orders/add")
    public ResponseEntity<String> addNewOrders(@RequestBody Orders order) {

        boolean created = orderService.createOrder(order);
        return (created) ? ResponseEntity.ok("Order created sucessfully") : ResponseEntity.notFound().build();

    }

    // UpdateOrder
    @PutMapping("orders/update/{orderId}")
    public ResponseEntity<String> updateOrder(@PathVariable long orderId, @RequestBody Orders updatedOrder) {
        boolean isUpdated = orderService.updateOrder(orderId, updatedOrder);

        if (isUpdated) {
            return ResponseEntity.ok("Order updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an Order
    @DeleteMapping("orders/delete/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        Orders existingOrder = orderService.getOrderById(orderId);
        if (existingOrder == null) {
            return ResponseEntity.notFound().build();
        }

        orderService.deleteOrder(existingOrder);
        return ResponseEntity.ok().build();
    }

}