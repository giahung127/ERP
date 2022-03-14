package com.erp.sale.repository;

import com.erp.sale.entity.OrderN;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderN, Long> {
    Optional<OrderN> findById(Long id);
}
