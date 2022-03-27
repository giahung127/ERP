package com.erp.sale.repository;

import com.erp.sale.entity.PriceList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PriceListRepository extends JpaRepository<PriceList, Long> {
    Optional<PriceList> findById(UUID id);
}
