package com.erp.scm.repository;

import com.erp.scm.entity.Transporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransporterRepository extends JpaRepository<Transporter, Long> {
    Optional<Transporter> findById(UUID id);
}
