package com.erp.hrm.service;

import com.erp.hrm.controller.request.ChangePasswordReq;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.Account;
import com.erp.hrm.entity.related.AccountStatus;
import com.erp.hrm.repository.AccountRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public NormalRes changePassword(ChangePasswordReq req) throws Error {
        String password = Hashing.sha256()
                .hashString(req.password, StandardCharsets.UTF_8)
                .toString();
        if (!accountRepository.existsAccountByUsernameAndPassword(req.username, password)){
            return new NormalRes("400", "Wrong username or password", "");
        }
        String newPassword = Hashing.sha256()
                .hashString(req.newPassword, StandardCharsets.UTF_8)
                .toString();
        Optional<Account> account = accountRepository.findAccountByUsernameAndPassword(req.username, password);
        account.get().setPassword(newPassword);
        account.get().setAccountStatus(AccountStatus.ACTIVATE);
        accountRepository.save(account.get());
        return new NormalRes("200", "Successfully update account password", "");
    }

    public List<Account> loadAll() throws Error {
        return accountRepository.findAll();
    }

    public NormalRes deactivate(String accountId) throws Error {
        Optional<Account> account =  accountRepository.findById(UUID.fromString(accountId));
        account.get().setAccountStatus(AccountStatus.DEACTIVATE);
        accountRepository.save(account.get());
        return new NormalRes("200", "Deactivate account successfully", "");
    }
}
