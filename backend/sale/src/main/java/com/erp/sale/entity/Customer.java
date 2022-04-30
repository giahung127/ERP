package com.erp.sale.entity;


import com.erp.sale.controller.request.NewCustomerReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private String code;
    private String name;
    private String gender;
    private Integer age;
    private String email;
    private String phone;
    private String address;
    public Customer(NewCustomerReq newCustomerReq){
        this.code = newCustomerReq.code;
        this.name = newCustomerReq.name;
        this.gender= newCustomerReq.gender;
        this.age = newCustomerReq.age;
        this.email = newCustomerReq.email;
        this.phone = newCustomerReq.phone;
        this.address = newCustomerReq.address;


    }
}
