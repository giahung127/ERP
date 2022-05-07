package com.erp.scm.controller;

import com.erp.scm.controller.request.NewSupplementReq;
import com.erp.scm.controller.response.GetListSupplementRes;
import com.erp.scm.controller.response.GetSupplementRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.entity.Supplement;
import com.erp.scm.service.SupplementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/loadAll")
    public GetListSupplementRes getAllSupplement(){
        return supplementService.loadAllSupplement();
    }

    @GetMapping("/getById/{id}")
    public GetSupplementRes getSupplementById(@PathVariable String id){
        return supplementService.getSupplementById(id);
    }

}
