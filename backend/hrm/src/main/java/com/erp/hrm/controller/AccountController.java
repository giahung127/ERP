package com.erp.hrm.controller;


import com.erp.hrm.controller.request.ChangePasswordReq;
import com.erp.hrm.controller.request.LoginReq;
import com.erp.hrm.controller.response.GetAccountByIdRes;
import com.erp.hrm.controller.response.GetEmployeeByIdRes;
import com.erp.hrm.controller.response.LoginRes;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.Account;
import com.erp.hrm.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/hrm/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("changePassword")
    public NormalRes changePassword(@RequestBody ChangePasswordReq req){
        return accountService.changePassword(req);
    }

    @GetMapping("loadAll")
    public List<Account> loadAll(){
        return accountService.loadAll();
    }

    @GetMapping("/getAccountById/{id}")
    public GetAccountByIdRes getPage(@PathVariable String id){
        return accountService.getAccountById(id);

    }

    @PostMapping("deactivate/{accountId}")
    public NormalRes deactivate(@PathVariable String accountId){
        return accountService.deactivate(accountId);
    }

    @PostMapping("activate/{accountId}")
    public NormalRes activate(@PathVariable String accountId){
        return accountService.activate(accountId);
    }

    @PostMapping("/login")
    public LoginRes loginAccount(@RequestBody LoginReq loginInfo){
        return accountService.loginAccount(loginInfo);
    }
}
