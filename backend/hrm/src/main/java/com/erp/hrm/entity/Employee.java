package com.erp.hrm.entity;

import com.erp.hrm.controller.request.EmployeeReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;

    private String  name;
    private Integer sex;
    private Date    join_date;
    private Date    birthday;
    private String  role;
    private String  contact_address;
    private Long    phone;
    private String  company_email;

    public Employee(EmployeeReq employeeReq){
        this.name              = employeeReq.name;
        this.sex                = employeeReq.sex;
        this.join_date          = employeeReq.join_date;
        this.birthday           = employeeReq.birthday;
        this.role               = employeeReq.role;
        this.contact_address    = employeeReq.contact_address;
        this.phone              = employeeReq.phone;
        this.company_email      = employeeReq.company_email;
    }
}
