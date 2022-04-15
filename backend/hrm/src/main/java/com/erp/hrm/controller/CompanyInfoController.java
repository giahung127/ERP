package com.erp.hrm.controller;


import com.erp.hrm.controller.request.NewCompanyInfoReq;
import com.erp.hrm.controller.request.UpdateCompanyInfoReq;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.CompanyInfo;
import com.erp.hrm.service.CompanyInfoService;
import com.erp.hrm.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/hrm/companyInfo")
public class CompanyInfoController {
    @Autowired
    private CompanyInfoService companyInfoService;

    @PostMapping("/newCompanyInfo")
    public NormalRes updateCompanyInfo(@RequestBody UpdateCompanyInfoReq updateCompanyInfoReq){
        return companyInfoService.updateCompanyInfo(updateCompanyInfoReq);
    }

    @GetMapping("/getInfo")
    public CompanyInfo getInfo(){
        return companyInfoService.getInfo();
    }
}
