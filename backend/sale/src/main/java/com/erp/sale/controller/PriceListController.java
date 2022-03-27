package com.erp.sale.controller;

import com.erp.sale.entity.PriceList;
import com.erp.sale.service.PriceListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:42975")
@RequestMapping("/sale/price_list")
public class PriceListController {
    @Autowired
    private PriceListService priceListService;

    @GetMapping("/loadAll")
    public List<PriceList> getAllPriceList(){
        return priceListService.loadAllPriceList();
    }
}

