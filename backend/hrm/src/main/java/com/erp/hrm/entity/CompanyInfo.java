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
    private String companyAddress;
    private String contactName;
    private String contactEmail;
    private String contactPhone;
    private String contactAddress;

    public CompanyInfo(UpdateCompanyInfoReq updateCompanyInfoReq){
        this.companyName = updateCompanyInfoReq.company_name;
        this.companyAddress = updateCompanyInfoReq.company_address;
        this.contactName = updateCompanyInfoReq.contact_name;
        this.contactEmail = updateCompanyInfoReq.contact_email;
        this.contactPhone = updateCompanyInfoReq.contact_phone;
        this.contactAddress = updateCompanyInfoReq.contact_address;
    }
}
