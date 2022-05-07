package com.erp.scm.repository;

import com.erp.scm.entity.Supplement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SupplementRepository extends JpaRepository<Supplement, Long> {
    Optional<Supplement> findById(UUID id);
}
