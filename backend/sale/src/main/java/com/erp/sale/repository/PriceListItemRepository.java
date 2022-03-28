package com.erp.sale.repository;

import com.erp.sale.entity.PriceListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceListItemRepository extends JpaRepository<PriceListItem, Long> {
}
