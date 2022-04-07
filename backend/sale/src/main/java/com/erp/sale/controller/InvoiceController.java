package com.erp.sale.controller;


import com.erp.sale.controller.request.NewInvoiceReq;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/sale/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/newInvoice")
    public NormalRes newInvoice(@RequestBody NewInvoiceReq newInvoiceReq){
        return invoiceService.newInvoice(newInvoiceReq);
    }
}
