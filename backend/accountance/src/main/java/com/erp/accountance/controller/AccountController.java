package com.erp.accountance.controller;

import com.erp.accountance.controller.request.LoginReq;
import com.erp.accountance.controller.request.NewAccountReq;
import com.erp.accountance.entity.Account;
import com.erp.accountance.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/newAccount")
    public String newAccount(@RequestBody NewAccountReq req){
        return accountService.newAccount(req);
    }

    @PostMapping("/login")
    public String loginAccount(@RequestBody LoginReq loginInfo){
        return accountService.loginAccount(loginInfo);
    }
}
