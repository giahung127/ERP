package com.erp.hrm.entity;

import com.erp.hrm.controller.request.UpdateCompanyInfoReq;
import lombok.*;
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
public class CompanyInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;

    private String companyName;
    private String phone;
    private String fax;
    private String address;
    private String slogan;

    public CompanyInfo(UpdateCompanyInfoReq updateCompanyInfoReq){
        this.companyName = updateCompanyInfoReq.company_name;
        this.phone = updateCompanyInfoReq.phone;
        this.fax = updateCompanyInfoReq.fax;
        this.address = updateCompanyInfoReq.address;
        this.slogan = updateCompanyInfoReq.slogan;
    }
}
