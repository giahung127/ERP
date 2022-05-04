package com.erp.sale.repository;

import com.erp.sale.controller.OrderStatus;
import com.erp.sale.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findById(UUID id);
    Optional<Order> findByCustomerId(String customerId);
    List<Order> findAllByCustomerId(String customerId);
    List<Order> findByIdIn(Collection<UUID> id);

//    String FIND_ORDER_ID = "SELECT * FROM order p WHERE p.order_status =:orderStatus";
//    @Query(value = FIND_ORDER_ID, nativeQuery = true)
    List<Order> findAllByOrderStatus (OrderStatus orderStatus);
}