package com.erp.hrm.controller;


import com.erp.hrm.controller.request.EmployeeReq;
import com.erp.hrm.controller.response.EmployeeRes;
import com.erp.hrm.controller.response.GetEmployeeByIdRes;
import com.erp.hrm.controller.response.GetEmployeeListRes;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.Employee;
import com.erp.hrm.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/hrm/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public NormalRes addEmployee(@RequestBody EmployeeReq employeeReq){
        return employeeService.newEmployee(employeeReq);
    }
    @GetMapping("/getAll")
    public GetEmployeeListRes getAll(){
        return employeeService.getAllEmployee();
    }

    @GetMapping("/getEmployeeById/{id}")
    public GetEmployeeByIdRes getPage(@PathVariable String id){
        return employeeService.getEmployeeById(id);

    }
    @PostMapping("/updateById/{id}")
    public NormalRes updateByID(@RequestBody EmployeeReq updateData, @PathVariable String id){
        return employeeService.updateById(updateData, id);
    }

//    @PostMapping("/updateById")
//    public ResponseEntity<String> upDateByID(@RequestBody Employee updateData){
//        return employeeService.findByIDAndUpdate(updateData);
//    }
//
//    @PostMapping("/deleteByID/{id}")
//    public ResponseEntity<String> deleteById(@PathVariable long id){
//        return employeeService.deleteProduct(id);
//    }

}
