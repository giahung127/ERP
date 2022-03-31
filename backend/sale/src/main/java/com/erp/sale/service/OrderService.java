package com.erp.sale.service;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.response.GetOrderRes;
import com.erp.sale.controller.response.NewOrderRes;
import com.erp.sale.entity.Order;
import com.erp.sale.entity.OrderItem;
import com.erp.sale.repository.OrderItemRepository;
import com.erp.sale.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    public NewOrderRes newOrder(NewOrderReq newOrderReq) {
        Order newOrder;
        try {
            newOrder = orderRepository.save(new Order(newOrderReq));
            List<OrderItem> ItemList = new ArrayList<>();
            for (int i = 0; i < newOrderReq.product_item_list.stream().count(); i++) {
                ItemList.add(new OrderItem(newOrder.getId().toString(),newOrderReq.product_item_list.get(i)));
            }
            orderItemRepository.saveAll(ItemList);
        } catch (Exception e){
            throw e;
        }
        return new NewOrderRes("200", "New Order Inserted",  newOrder.getId().toString());
    }
    public List<Order> loadAllOrder(){
        return (List<Order>) orderRepository.findAll();
    }

    public Page<Order> loadPageOrder(PageRequest sort) {
        Page<Order> resultt =  orderRepository.findAll(sort);
        return resultt;
    }

    public GetOrderRes getOrderById(String id) throws Error {
        Optional<Order> result =  orderRepository.findById(UUID.fromString(id));
        if (result.isEmpty()){
            return new GetOrderRes("404", "Not Found", result);
        }
        return new GetOrderRes("200", "Get Order By ID", result);
    }
}
