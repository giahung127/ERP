package com.erp.sale.repository;

import com.erp.sale.entity.OrderToInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderToInvoiceRepository extends JpaRepository<OrderToInvoice, Long> {
    List<OrderToInvoice> findAllByInvoiceId(String invoiceId);
}
