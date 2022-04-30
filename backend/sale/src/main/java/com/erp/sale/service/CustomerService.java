package com.erp.sale.service;

import com.erp.sale.controller.request.NewCustomerReq;
import com.erp.sale.controller.request.UpdateCustomerReq;
import com.erp.sale.controller.response.GetCustomerByIdRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.Customer;
import com.erp.sale.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public NormalRes newCustomer(NewCustomerReq newCustomerReq) throws Error{
        Customer temp = customerRepository.save(new Customer(newCustomerReq));
        return new NormalRes("200", "Inserted new customer", temp.getId().toString());
    }

    public List<Customer> loadAll() throws Error {
        return customerRepository.findAll();
    }

    public NormalRes updateById(UpdateCustomerReq updateCustomerReq) throws Error {
        Optional<Customer> temp = customerRepository.findById(UUID.fromString(updateCustomerReq.id));
        if (temp.isEmpty()){
            return new NormalRes("404", "No record in DB", "");
        }
        temp.get().setAddress(updateCustomerReq.address);
        temp.get().setAge(updateCustomerReq.age);
        temp.get().setEmail(updateCustomerReq.email);
        temp.get().setGender(updateCustomerReq.gender);
        temp.get().setPhone(updateCustomerReq.phone);
        temp.get().setName(updateCustomerReq.name);
        temp.get().setCode(updateCustomerReq.code);
        customerRepository.save(temp.get());
        return new NormalRes("200", "Updated", "");
    }

    public GetCustomerByIdRes getById(String id) throws Error {
        Optional<Customer> temp =  customerRepository.findById(UUID.fromString(id));
        if (temp.isEmpty()){
            return new GetCustomerByIdRes("404", "No record in DB", null);
        }
        return new GetCustomerByIdRes("200", "Found record of customer", temp);
    }
}
