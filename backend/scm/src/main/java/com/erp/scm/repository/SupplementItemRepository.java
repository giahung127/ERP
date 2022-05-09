package com.erp.scm.repository;

import com.erp.scm.entity.SupplementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface SupplementItemRepository extends JpaRepository<SupplementItem, Long> {
    List<SupplementItem> findAllBySupplementId(String id);
    List<SupplementItem> findAllByProductId(String productId);
    Optional<SupplementItem> findSupplementItemByProductIdAndSupplementId(String productId, String supplementId);
}