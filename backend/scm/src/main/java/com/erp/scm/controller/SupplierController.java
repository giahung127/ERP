package com.erp.scm.controller;

import com.erp.scm.controller.request.NewSupplierReq;
import com.erp.scm.controller.request.UpdateSupplierReq;
import com.erp.scm.controller.response.GetSupplierByIdRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/newSupplier")
    public NormalRes newSupplier(@RequestBody NewSupplierReq supplierReq){
        return supplierService.newSupplier(supplierReq);
    }

    @GetMapping("/getById/{id}")
    public GetSupplierByIdRes getSupplierById(@PathVariable String id){
        return supplierService.getSupplierById(id);
    }

    @PostMapping("/update")
    public NormalRes update(@RequestBody UpdateSupplierReq updateSupplierReq){
        return supplierService.update(updateSupplierReq);
    }

    @GetMapping("/delete/{id}")
    public NormalRes delete(@PathVariable String id){
        return supplierService.delete(id);
    }

}
