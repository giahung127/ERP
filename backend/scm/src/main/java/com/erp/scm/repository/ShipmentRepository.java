package com.erp.scm.repository;

import com.erp.scm.entity.Product;
import com.erp.scm.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findById(UUID id);
    Optional<Shipment> findShipmentByOrderId(String id);

}
