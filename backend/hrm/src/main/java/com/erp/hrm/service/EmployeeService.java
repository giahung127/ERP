package com.erp.hrm.service;

import com.erp.hrm.controller.EmployeeReq;
import com.erp.hrm.entity.Employee;
import com.erp.hrm.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public String newEmployee(EmployeeReq employeeReq) {
        final Employee savedEmm = employeeRepository.save(new Employee(employeeReq));
        return new String("ok");
    }
    public List<Employee> loadAllEmployee(){
        return (List<Employee>) employeeRepository.findAll();
    }

    public Page<Employee> loadPageEmployee(PageRequest sort) {
        Page<Employee> resultt =  employeeRepository.findAll(sort);
        return resultt;
    }
}
