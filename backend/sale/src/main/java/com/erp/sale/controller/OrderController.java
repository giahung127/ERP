package com.erp.sale.controller;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.request.UpdateStatusReq;
import com.erp.sale.controller.response.GetOrderRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.Order;
import com.erp.sale.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/sale/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/newOrder")
    public NormalRes addProduct(@RequestBody NewOrderReq newCategoryReq){
        return orderService.newOrder(newCategoryReq);
    }

    @PostMapping("/toInvoice")
    public NormalRes toInvoice(@RequestBody String id){
        return orderService.toInvoice(id);
    }

    @GetMapping("/loadAll")
    public List<Order> getAllProduct(){
        return orderService.loadAllOrder();
    }

    @GetMapping("/getById/{id}")
    public GetOrderRes getOrderById(@PathVariable String id){
        return orderService.getOrderById(id);
    }

    @PostMapping("/updateStatus")
    public NormalRes updateByIdAndStatus(@RequestBody UpdateStatusReq updateStatusReq){
        return orderService.updateStatus(updateStatusReq);
    }

    @GetMapping("/getOrderByCustomerId/{customerId}")
    public GetOrderRes getOrderByCustomerId(@PathVariable String customerId){
        return orderService.getOrderByCustomerId(customerId);
    }


}
