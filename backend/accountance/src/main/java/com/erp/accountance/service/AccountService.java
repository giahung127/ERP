package com.erp.accountance.service;

import com.erp.accountance.controller.LoginInfo;
import com.erp.accountance.entity.Account;
import com.erp.accountance.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account newAccount(Account account) {
        return accountRepository.save(account);
    }

    public Optional<String> loginAccount(LoginInfo loginInfo){
        Optional<Account> result = accountRepository.findByUsername(loginInfo.username);
        if (result.isEmpty()){
            return Optional.empty();
        }
        else if (Objects.equals(result.get().getPassword(), loginInfo.password)){
            return Optional.of("ok");
        }
        return Optional.of("not found");
    }
}
