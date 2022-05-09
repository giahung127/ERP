package com.erp.hrm.repository;

import com.erp.hrm.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsAccountByUsernameAndPassword(String username, String password);
    Optional<Account> findAccountByUsernameAndPassword(String username, String password);
    Optional<Account> findById(UUID accountId);
}
