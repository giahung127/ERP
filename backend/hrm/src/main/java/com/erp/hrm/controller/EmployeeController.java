package com.erp.hrm.controller;


import com.erp.hrm.entity.Employee;
import com.erp.hrm.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public String addEmployee(@RequestBody EmployeeReq employeeReq){
        return employeeService.newEmployee(employeeReq);
    }
    @GetMapping("/getAll")
    public List<EmployeeRes> getAll(){
        List<Employee> empList = (List<Employee>) employeeService.loadAllEmployee();
        if (empList.isEmpty()){
            try {
                throw new Exception();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        List<EmployeeRes> empReslst = empList.parallelStream()
                .map(empp ->{
                    final EmployeeRes emRes = new EmployeeRes();
                    emRes.setFname(empp.getFname());
                    emRes.setLname(empp.getLname());
                    emRes.setPosition(empp.getPosition());
                    emRes.setDepartment(empp.getDepartment());
                    emRes.setPhone(empp.getPhone());
                    return emRes;
                }).collect(Collectors.toList());
        return empReslst;
    }

    @GetMapping("/getPage")
    public List<EmployeeRes> getPage(@RequestBody GetInforReq getInforReq){
        Integer pageNum = getInforReq.pageNum;
        Integer size = getInforReq.size;
        System.out.println(size);
        PageRequest sort = PageRequest.of(pageNum, size);
        Page<Employee> empList = employeeService.loadPageEmployee(sort);
        if (empList.isEmpty()){
            try {
                throw new Exception();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        List<EmployeeRes> empReslst = empList.getContent().parallelStream()
                .map(empp ->{
                    final EmployeeRes emRes = new EmployeeRes();
                    emRes.setFname(empp.getFname());
                    emRes.setLname(empp.getLname());
                    emRes.setPosition(empp.getPosition());
                    emRes.setDepartment(empp.getDepartment());
                    emRes.setPhone(empp.getPhone());
                    return emRes;
                }).collect(Collectors.toList());
        return empReslst;
    }
}
