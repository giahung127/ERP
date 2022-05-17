package com.erp.hrm.controller.response;

import com.erp.hrm.entity.Account;
import com.erp.hrm.entity.Employee;

public class GetAccountByIdRes {
    public String code;
    public String message;
    public Account data;

    public GetAccountByIdRes(String code, String message, Account data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
