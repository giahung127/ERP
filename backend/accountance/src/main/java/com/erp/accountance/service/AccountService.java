package com.erp.accountance.service;

import com.erp.accountance.controller.request.LoginReq;
import com.erp.accountance.controller.request.NewAccountReq;
import com.erp.accountance.entity.Account;
import com.erp.accountance.repository.AccountRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public String newAccount(NewAccountReq req) throws Error {
        Optional<Account> result = accountRepository.findByUsername(req.username);
        if (result.isPresent()){
            return "Duplicate entry '" + req.username +"' for key 'username'";
        }
        accountRepository.save(new Account(req));
        return "ok";
    }

    public String loginAccount(LoginReq loginInfo) throws Error{
        Optional<Account> result = accountRepository.findByUsername(loginInfo.username);
        if (result.isEmpty()){
            return "Found no account, miss input";
        }
        else if (Objects.equals(result.get().getPassword(), Hashing.sha256().hashString(loginInfo.password, StandardCharsets.UTF_8).toString())){
            return "ok";
        }
        return "not found";
    }
}
