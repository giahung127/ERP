package com.erp.accountance.repository;

import com.erp.accountance.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findById(UUID id);
    Optional<Account> findByUsername(String username);
}
