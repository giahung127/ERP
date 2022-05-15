package com.erp.hrm.service;

import com.erp.hrm.controller.request.EmployeeReq;
import com.erp.hrm.controller.response.GetEmployeeByIdRes;
import com.erp.hrm.controller.response.GetEmployeeListRes;
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
import java.util.Optional;
import java.util.UUID;

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
    public GetEmployeeListRes getAllEmployee()throws Error {
        List<Employee> result = employeeRepository.findAll();
        return new GetEmployeeListRes("200", "Found all Suppliers", result);
    }

    public GetEmployeeByIdRes getEmployeeById(String id) {
        Optional<Employee> result = employeeRepository.findById(UUID.fromString(id));
        assert(result.isEmpty());
        return new GetEmployeeByIdRes("200", "Found Supplier Record", result.get());
    }
}
