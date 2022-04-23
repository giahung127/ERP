package com.erp.scm.repository;

import com.erp.scm.entity.SupplementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplementItemRepository extends JpaRepository<SupplementItem, Long> {
}