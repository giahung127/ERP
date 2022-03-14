package com.erp.sale.controller;

import com.erp.sale.entity.OrderN;
import com.erp.sale.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:42975")
@RequestMapping("/sale/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/newOrder")
    public ResponseEntity<String> addProduct(@RequestBody NewOrderReq newCategoryReq){
        return orderService.newOrder(newCategoryReq);
    }

    @GetMapping("/loadAll")
    public List<OrderN> getAllProduct(){
        return orderService.loadAllOrder();
    }

}
