package com.example.CoffeeApp.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.example.CoffeeApp.domains.OrderItems;

public interface OrderItemsRepo extends CrudRepository<OrderItems, String> {

    List<OrderItems> findByOrdersOrderId(Long orderId);

}
