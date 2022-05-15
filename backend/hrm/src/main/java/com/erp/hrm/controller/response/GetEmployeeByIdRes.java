package com.erp.hrm.controller.response;

import com.erp.hrm.entity.Employee;

import java.util.List;

public class GetEmployeeByIdRes {
        public String code;
        public String message;
        public Employee data;

        public GetEmployeeByIdRes(String code, String message, Employee data) {
            this.code = code;
            this.message = message;
            this.data = data;
        }
}
