package com.erp.scm.repository;

import com.erp.scm.entity.SupplementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplementItemRepository extends JpaRepository<SupplementItem, Long> {
    List<SupplementItem> findAllBySupplementId(String id);
    List<SupplementItem> findAllByProductId(String id);

}