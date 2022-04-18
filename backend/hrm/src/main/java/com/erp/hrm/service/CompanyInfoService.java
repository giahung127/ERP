package com.erp.hrm.service;

import com.erp.hrm.controller.request.UpdateCompanyInfoReq;
import com.erp.hrm.controller.response.NormalRes;
import com.erp.hrm.entity.CompanyInfo;
import com.erp.hrm.repository.CompanyInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyInfoService {
    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    public NormalRes updateCompanyInfo(UpdateCompanyInfoReq updateCompanyInfoReq) throws Error {
        if (Objects.equals(updateCompanyInfoReq.id, "")){
            if (!companyInfoRepository.findAll().isEmpty()){
                return new NormalRes("400", "Company Information Existed, must provide Id", "");
            }
            CompanyInfo temp = companyInfoRepository.save(new CompanyInfo(updateCompanyInfoReq));
            return new NormalRes("200", "Created Company Information", temp.getId().toString());
        }
        Optional<CompanyInfo> result = companyInfoRepository.findById(UUID.fromString(updateCompanyInfoReq.id));
        result.get().setCompanyName(updateCompanyInfoReq.company_name);
        result.get().setCompanyAddress(updateCompanyInfoReq.company_address);
        result.get().setContactName(updateCompanyInfoReq.contact_name);
        result.get().setContactEmail(updateCompanyInfoReq.contact_email);
        result.get().setContactPhone(updateCompanyInfoReq.contact_phone);
        result.get().setContactAddress(updateCompanyInfoReq.contact_address);
        companyInfoRepository.save(result.get());
        return new NormalRes("200", "Updated Company Information", "");
    }

    public CompanyInfo getInfo() throws Error {
        return companyInfoRepository.findAll().get(0);
    }
}
