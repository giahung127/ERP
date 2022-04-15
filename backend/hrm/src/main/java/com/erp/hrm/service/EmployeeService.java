package com.erp.hrm.service;

import com.erp.hrm.controller.request.EmployeeReq;
import com.erp.hrm.entity.Employee;
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

    public ResponseEntity<String> newEmployee(EmployeeReq employeeReq) {
        try {
            employeeRepository.save(new Employee(employeeReq));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Inserted new employee");
    }
    public List<Employee> loadAllEmployee(){
        return (List<Employee>) employeeRepository.findAll();
    }

    public Page<Employee> loadPageEmployee(PageRequest sort) {
        Page<Employee> resultt =  employeeRepository.findAll(sort);
        return resultt;
    }



}
