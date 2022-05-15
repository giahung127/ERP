package com.erp.hrm.controller.response;

import com.erp.hrm.entity.Employee;

import java.util.List;

public class GetEmployeeListRes {
    public String code;
    public String message;
    public List<Employee> data;

    public GetEmployeeListRes(String code, String message, List<Employee> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
