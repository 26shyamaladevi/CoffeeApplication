package com.example.CoffeeApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.CoffeeApp.domains.*;
import com.example.CoffeeApp.repositories.OrderItemsRepo;
import com.example.CoffeeApp.repositories.OrdersRepo;
import com.example.CoffeeApp.repositories.PaymentRepo;

@Service
public class OrderService {

    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrdersRepo ordersRepo;
    @Autowired
    private PaymentRepo paymentRepo;
    @Autowired
    private OrderItemsRepo orderItemsRepo;

    private static final String INVALID_PRODUCT = "Invalid Product";
    private static final String INVALID_CUSTOMER = "Invalid Customer";
    private static final String ORDER_NOTFOUND = "Order Not Found";

    public OrderService(UserService userService, ProductService productService, OrdersRepo orderepo,
            OrderItemsRepo orderItemsRepo,
            PaymentRepo paymentRepo) {
        this.userService = userService;
        this.productService = productService;
        this.ordersRepo = orderepo;
        this.orderItemsRepo = orderItemsRepo;
        this.paymentRepo = paymentRepo;
    }

    // Display Items of the Orders by OrderID
    public List<OrderItems> viewOrders(Long orderId) {
        // Find the order by its order number
        Optional<Orders> optionalOrder = ordersRepo.findByOrderId(orderId);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException(ORDER_NOTFOUND);
        }

        Orders order = optionalOrder.get();
        return orderItemsRepo.findByOrdersOrderId(order.getOrderId());
    }

    // View all orders
    public List<OrderItems> viewAllOrders(Long userId) {
        List<Orders> allOrders = ordersRepo.findAllByCustomerUserIdOrderByOrderDateAsc(userId);

        List<OrderItems> allOrderItems = new ArrayList<>();

        for (Orders order : allOrders) {
            List<OrderItems> orderItems = viewOrders(order.getOrderId());
            allOrderItems.addAll(orderItems);
        }

        return allOrderItems;
    }

    // Create a New Order
    public Long createOrder(Orders order) {

        User customer = userService.findById(order.getCustomer().getUserId());
        if (customer == null) {
            throw new IllegalArgumentException(INVALID_CUSTOMER);
        }
        Payment payment = paymentRepo.findByPaymentMethod(order.getPaymentMethod());

        if (payment == null) {
            throw new IllegalArgumentException(INVALID_CUSTOMER);
        }

        Orders newOrder = new Orders();
        newOrder.setCustomer(customer);
        newOrder.setCustomerEmailId(customer.getEmailId());
        newOrder.setPaymentMethod(payment.getPaymentMethod());
        newOrder.setTotalPrice(order.getTotalPrice());

        // Save the Orders and get the generated ID
        Orders savedOrder = ordersRepo.save(newOrder);
        Long orderId = savedOrder.getOrderId();

        // Set the managed Orders entity to the OrderItems
        for (OrderItems orderItem : order.getOrderItems()) {

            // Check if the Product Exsist in the product table
            if (productService.existsById(orderItem.getpId())) {

                Product product = productService.findById(orderItem.getpId());
                orderItem.setpId(product.getid());
                orderItem.setpName(product.getproductName());
                orderItem.setPrice(orderItem.getPrice());
                orderItem.setOrders(newOrder);
            } else {
                throw new IllegalArgumentException(INVALID_PRODUCT);

            }
        }

        // Save the OrderItems entities
        orderItemsRepo.saveAll(order.getOrderItems());

        return orderId;

    }

    // Update Orders
    public boolean updateOrder(Long orderId, Orders updatedOrder) {
        // Check if the order exists
        Optional<Orders> optionalOrder = ordersRepo.findByOrderId(orderId);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException(ORDER_NOTFOUND);
        }

        Orders existingOrder = optionalOrder.get();

        // Update the properties of the existing order with the values from the updated
        // order
        existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());

        // Update the order items
        List<OrderItems> updatedOrderItems = updatedOrder.getOrderItems();
        List<OrderItems> existingOrderItems = existingOrder.getOrderItems();

        for (OrderItems updatedItem : updatedOrderItems) {

            boolean itemExists = false;

            for (OrderItems existingItem : existingOrderItems) {

                if (existingItem.getpId() == updatedItem.getpId()) {
                    // Update the existing order item
                    Product product = productService.findById(updatedItem.getpId());
                    if (product != null) {
                        existingItem.setpId(product.getid());
                        existingItem.setpName(product.getproductName());
                        existingItem.setPrice(product.getprice());
                        existingItem.setQuantity(updatedItem.getQuantity());
                        existingItem.setOrders(existingOrder);
                    } else {
                        throw new IllegalArgumentException(INVALID_PRODUCT);
                    }
                    itemExists = true;
                    break;
                }
            }
            if (!itemExists) {
                // Add the new order item to the existing order
                Product product = productService.findById(updatedItem.getpId());
                if (product != null) {
                    updatedItem.setpId(product.getid());
                    updatedItem.setpName(product.getproductName());
                    updatedItem.setPrice(product.getprice());
                    updatedItem.setOrders(existingOrder);
                    existingOrderItems.add(updatedItem);
                } else {
                    throw new IllegalArgumentException(INVALID_PRODUCT);
                }
            }
        }

        // Save the updated order
        ordersRepo.save(existingOrder);

        return true;
    }

    // Delete order
    public void deleteOrder(Orders order) {
        ordersRepo.delete(order);
    }

    public Orders getOrderById(Long orderId) {
        Optional<Orders> optionalOrder = ordersRepo.findByOrderId(orderId);
        return optionalOrder.orElse(null);
    }

}
