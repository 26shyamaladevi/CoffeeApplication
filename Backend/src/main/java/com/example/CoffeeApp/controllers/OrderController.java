package com.example.CoffeeApp.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.example.CoffeeApp.services.UserService;
import com.example.CoffeeApp.dto.UserDto;

import org.springframework.security.core.Authentication;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    // ViewOrders by Id
    @GetMapping("orders/{orderId}")
    public List<OrderItems> getOrders(@PathVariable("orderId") Long orderId) {
        return orderService.viewOrders(orderId);
    }

    // View all Orders
    @GetMapping("orders")
    public List<OrderItems> getAllOrders() {

        // Get the logged-in user's ID from the Authentication object
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = getUserIdFromAuthentication(authentication);

        // Fetch orders for the logged-in user using the OrderService
        if (userId != null && userService.isexistsByUserId(userId)) {
            return orderService.viewAllOrders(userId);
        }

        return Collections.emptyList();

    }

    // Method to extract the user ID from the Authentication object
    private Long getUserIdFromAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDto) {

            UserDto userDetails = (UserDto) authentication.getPrincipal();

            return userDetails.getUserId();
        }
        return null;
    }

    // CreateOrder
    @PostMapping("orders/add")
    public ResponseEntity<Long> addNewOrders(@RequestBody Orders order) {

        Long orderId = orderService.createOrder(order);
        return (orderId != null) ? ResponseEntity.ok(orderId) : ResponseEntity.notFound().build();

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