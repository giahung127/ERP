package com.erp.sale.repository;

import com.erp.sale.entity.Invoice;
import com.erp.sale.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findById(UUID id);
    List<Invoice> findByIdIn(Collection<UUID> id);
}
