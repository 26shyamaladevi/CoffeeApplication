package com.example.CoffeeApp.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.example.CoffeeApp.domains.Orders;

public interface OrdersRepo extends CrudRepository<Orders, Long> {

    // Query method to retrieve orders sorted by orderDate in descending order
    List<Orders> findAllByCustomerUserIdOrderByOrderDateDesc(Long userId);

    // Method to fetch orders by OrderId
    Optional<Orders> findByOrderId(long orderId);

}
