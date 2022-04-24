package com.erp.scm.controller;

import com.erp.scm.controller.request.NewSupplementReq;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.service.SupplementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/supplement")
public class SupplementController {
    @Autowired
    private SupplementService supplementService;

    @PostMapping("/newSupplement")
    public NormalRes newSupplement(@RequestBody NewSupplementReq newSupplementReq){
        return supplementService.newSupplement(newSupplementReq);
    }

}
