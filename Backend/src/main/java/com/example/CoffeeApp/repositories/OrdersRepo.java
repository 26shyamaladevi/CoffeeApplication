package com.example.CoffeeApp.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.example.CoffeeApp.domains.Orders;

public interface OrdersRepo extends CrudRepository<Orders, String> {

    Optional<Orders> findByOrderId(long orderId);

}
