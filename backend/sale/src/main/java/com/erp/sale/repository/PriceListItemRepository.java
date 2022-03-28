package com.erp.sale.repository;

import com.erp.sale.entity.PriceListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceListItemRepository extends JpaRepository<PriceListItem, Long> {
    List<PriceListItem> findPriceListItemByPriceListId(String Id);

}
