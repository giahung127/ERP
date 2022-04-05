package com.erp.scm.service;

import com.erp.scm.controller.request.NewTransporterReq;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.entity.Transporter;
import com.erp.scm.repository.TransporterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransporterService {
    @Autowired
    private TransporterRepository transporterRepository;

    public NormalRes newTranSporter(NewTransporterReq newTransporterReq) throws Error {
        Transporter temp = transporterRepository.save(new Transporter(newTransporterReq));
        return new NormalRes("200", "Inserted new Transporter", temp.getId().toString());
    }
}
