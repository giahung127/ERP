package com.erp.hrm.controller;


import com.erp.hrm.controller.request.EmployeeReq;
import com.erp.hrm.controller.response.EmployeeRes;
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

    @GetMapping("/getPage")
    public List<EmployeeRes> getPage(@RequestBody GetInforReq getInforReq){
        Integer pageNum = getInforReq.pageNum;
        Integer size = getInforReq.size;
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
                    emRes.setEmployeeId(empp.getId());
                    emRes.setName(empp.getName());
                    emRes.setPhone(empp.getPhone());
                    return emRes;
                }).collect(Collectors.toList());
        return empReslst;
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
