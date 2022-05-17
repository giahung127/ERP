package com.erp.hrm.controller.response;

import com.erp.hrm.entity.Account;
import com.erp.hrm.entity.Employee;

import java.util.List;

public class LoginRes {
    public String code;
    public String message;
    public Account data;
    public LoginRes(String code, String message, Account data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
