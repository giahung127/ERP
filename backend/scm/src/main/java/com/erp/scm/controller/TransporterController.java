package com.erp.scm.controller;

import com.erp.scm.controller.request.NewTransporterReq;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.service.TransporterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/transporter")
public class TransporterController {
    @Autowired
    private TransporterService transporterService;

    @PostMapping("/newTransporter")
    public NormalRes newTransporter(@RequestBody NewTransporterReq newTransporterReq){
        return transporterService.newTranSporter(newTransporterReq);
    }
}