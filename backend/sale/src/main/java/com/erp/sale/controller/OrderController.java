package com.erp.sale.controller;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.response.NewOrderRes;
import com.erp.sale.entity.Order;
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
    public NewOrderRes addProduct(@RequestBody NewOrderReq newCategoryReq){
        return orderService.newOrder(newCategoryReq);
    }

    @GetMapping("/loadAll")
    public List<Order> getAllProduct(){
        return orderService.loadAllOrder();
    }
}
