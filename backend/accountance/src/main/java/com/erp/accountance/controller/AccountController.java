package com.erp.accountance.controller;

import com.erp.accountance.entity.Account;
import com.erp.accountance.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/new")
    public Account newAccount(@RequestBody Account account){
        log.info("Inside newAccount - AccountController");
        return accountService.newAccount(account);
    }

    @PostMapping("/{id}")
    public Account loginAccount(@PathVariable("id") long id){
        log.info("Inside loginAccount - AccountController");
        return accountService.loginAccount(id);
    }
}
