package com.erp.sale.repository;

import com.erp.sale.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findById(UUID id);
    Optional<Order> findByCustomerId(String customerId);
}