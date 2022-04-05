package com.erp.scm.repository;

import com.erp.scm.entity.ShipmentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShipmentItemRepository extends JpaRepository<ShipmentItem, Long> {
    Optional<ShipmentItem> findByShipmentIdAndProductId(String shipmentId, String productId);
    List<ShipmentItem> findAllByShipmentId(String shipmentId);
}