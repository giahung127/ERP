package com.erp.sale.repository;

import com.erp.sale.entity.OrderToInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderToInvoiceRepository extends JpaRepository<OrderToInvoice, Long> {
}
