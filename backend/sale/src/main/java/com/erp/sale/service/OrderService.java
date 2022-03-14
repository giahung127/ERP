package com.erp.sale.service;

import com.erp.sale.controller.NewOrderReq;
import com.erp.sale.entity.OrderN;
import com.erp.sale.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public ResponseEntity<String> newOrder(NewOrderReq newOrderReq) {
        try {
            orderRepository.save(new OrderN(newOrderReq));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Inserted new order");
    }
    public List<OrderN> loadAllOrder(){
        return (List<OrderN>) orderRepository.findAll();
    }

    public Page<OrderN> loadPageOrder(PageRequest sort) {
        Page<OrderN> resultt =  orderRepository.findAll(sort);
        return resultt;
    }




}
