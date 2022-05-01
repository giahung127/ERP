package com.erp.sale.repository;

import com.erp.sale.entity.OrderToInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;
import java.util.UUID;

@Repository
public interface OrderToInvoiceRepository extends JpaRepository<OrderToInvoice, Long> {
    List<OrderToInvoice> findAllByInvoiceId(String invoiceId);

    String FIND_ORDER_ID = "SELECT order_id FROM order_to_invoice p WHERE p.invoice_id =:invoiceId";
    @Query(value = FIND_ORDER_ID, nativeQuery = true)
    List<String> findOrderIdList(String invoiceId);
}
