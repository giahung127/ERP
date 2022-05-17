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
        List<Employee> employeeList = employeeRepository.findAll();
        String sequencePart = ("000000" + (employeeList.size() + 1));
        String code = "EMP" + sequencePart.substring(sequencePart.length() - 6);
        Employee employee = employeeRepository.save(new Employee(employeeReq, code));
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

    public NormalRes updateById(EmployeeReq employeeReq, String id) throws Error {
        Optional<Employee> result = employeeRepository.findById(UUID.fromString(id));
        if (result.isEmpty()){
            return new NormalRes("403","No record of given employee information found", "");
        }
        Employee employee = result.get();
        employee.setName(employeeReq.name);
        employee.setBirthday(employeeReq.birthday);
        employee.setSex(employeeReq.sex);
        employee.setRole(employeeReq.role);
        employee.setJoin_date(employeeReq.join_date);
        employee.setContact_address(employeeReq.contact_address);
        employee.setPhone(employeeReq.phone);
        employeeRepository.save(employee);
        return new NormalRes("200", "The employee is updated successfully","");
    }
}
