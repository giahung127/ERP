package com.erp.hrm.service;

import com.erp.hrm.controller.request.EmployeeReq;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.Account;
import com.erp.hrm.entity.Employee;
import com.erp.hrm.repository.AccountRepository;
import com.erp.hrm.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AccountRepository accountRepository;

    public NormalRes newEmployee(EmployeeReq employeeReq) throws Error {
        Employee employee = employeeRepository.save(new Employee(employeeReq));
        accountRepository.save(new Account(employee.getCompany_email(), "abc123", employee.getId().toString()));
        return new NormalRes("200", "Inserted new employee", employee.getId().toString());
    }
    public List<Employee> loadAllEmployee() throws Error{
        return (List<Employee>) employeeRepository.findAll();
    }

    public Page<Employee> loadPageEmployee(PageRequest sort) {
        Page<Employee> resultt =  employeeRepository.findAll(sort);
        return resultt;
    }
}
