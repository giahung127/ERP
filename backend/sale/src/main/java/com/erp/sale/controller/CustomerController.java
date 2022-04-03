package com.erp.sale.controller;

import com.erp.sale.controller.request.NewCustomerReq;
import com.erp.sale.controller.request.UpdateCustomerReq;
import com.erp.sale.controller.response.GetCustomerByIdRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.Customer;
import com.erp.sale.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/sale/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("newCustomer")
    public NormalRes newCustomer (@RequestBody NewCustomerReq newCustomerReq){
        return customerService.newCustomer(newCustomerReq);
    }

    @GetMapping("loadAll")
    public List<Customer> loadAll(){
        return customerService.loadAll();
    }

    @GetMapping("getById/{id}")
    public GetCustomerByIdRes getByID(@PathVariable String id){
        return customerService.getById(id);
    }

    @PostMapping("updateById")
    public NormalRes UpdateById(@RequestBody UpdateCustomerReq updateCustomerReq){
        return customerService.updateById(updateCustomerReq);
    }
}
