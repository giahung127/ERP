package com.erp.sale.controller;


import com.erp.sale.controller.request.NewInvoiceReq;
import com.erp.sale.controller.response.InvoiceWithItem;
import com.erp.sale.controller.response.InvoiceWithItemRes;
import com.erp.sale.controller.response.InvoicesWithItemRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.Invoice;
import com.erp.sale.service.InvoiceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getAll")
    public InvoicesWithItemRes getAll(){
        return invoiceService.getAll();
    }

    @GetMapping("/getById/{id}")
    public InvoiceWithItemRes getById(@PathVariable String id){
        return invoiceService.getById(id);
    }

    @GetMapping("/getListInvoiceByIds")
    public InvoicesWithItemRes getInvoiceByIds(@RequestParam List<String> ids){ return invoiceService.getInvoicesByIds((ids));}

    @PostMapping("/updateStatus")
    public NormalRes updateByIdAndStatus(@RequestBody UpdateInvoiceStatusReq updateStatusReq){
        return invoiceService.updateStatus(updateStatusReq);
    }
}
