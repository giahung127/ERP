package com.erp.sale.controller.response;

import com.erp.sale.entity.Customer;

import java.util.Optional;

public class GetCustomerByIdRes {
    public String status;
    public String message;
    public Optional<Customer> customer;

    public GetCustomerByIdRes(String s, String m, Optional<Customer> c){
        this.message = m;
        this.status = s;
        this.customer = c;
    }
}
