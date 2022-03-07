package com.erp.hrm.entity;

import com.erp.hrm.controller.EmployeeReq;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long    id;

    private String  name;
    private Integer sex;
    private String  department;
    private String  position;
    private Date    change_date;
    private Date    join_date;
    private Date    birthday;
    private String  birth_place;
    private Boolean marital_status;
    private String  contact_address;
    private Long    phone;
    private String  company_email;
    private String  personal_email;
    private String  bank_name;
    private Long    account_no;

    public Employee(EmployeeReq employeeReq){
        this.name              = employeeReq.name;
        this.sex                = employeeReq.sex;
        this.department         = employeeReq.department;
        this.position           = employeeReq.position;
        this.change_date        = employeeReq.change_date;
        this.join_date          = employeeReq.join_date;
        this.birthday           = employeeReq.birthday;
        this.birth_place        = employeeReq.birth_place;
        this.marital_status     = employeeReq.marital_status;
        this.contact_address    = employeeReq.contact_address;
        this.phone              = employeeReq.phone;
        this.company_email      = employeeReq.company_email;
        this.personal_email     = employeeReq.personal_email;
        this.bank_name          = employeeReq.bank_name;
        this.account_no         = employeeReq.account_no;
    }
}
