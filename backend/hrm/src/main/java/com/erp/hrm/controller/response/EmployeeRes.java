package com.erp.hrm.controller.response;

import lombok.Setter;

import java.util.UUID;

@Setter
public class EmployeeRes {
    public UUID employeeId;
    public String  name;
    public String  position;
    public String    phone;
    public String  department;
}
