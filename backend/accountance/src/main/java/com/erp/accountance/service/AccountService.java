package com.erp.accountance.service;

import com.erp.accountance.entity.Account;
import com.erp.accountance.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account newAccount(Account account) {
        return accountRepository.save(account);
    }

    public Optional<Account> loginAccount(Long id){
        return accountRepository.findById(id);
    }
}
