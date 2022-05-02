package com.erp.sale.service;

import com.erp.sale.controller.OrderStatus;
import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.request.UpdateStatusReq;
import com.erp.sale.controller.response.GetOrderRes;
import com.erp.sale.controller.response.GetOrdersRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.controller.response.OrderWithItems;
import com.erp.sale.entity.*;
import com.erp.sale.repository.*;
import com.erp.sale.service.api.ProductService;
import com.erp.sale.service.api.ShipmentService;
import com.erp.sale.service.api.request.UpdateAfterOrderReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ShipmentService shipmentService;
    @Autowired
    private ProductService productService;

    public NormalRes newOrder(NewOrderReq newOrderReq) throws Error {
        Order newOrder;
        newOrder = orderRepository.save(new Order(newOrderReq));
        List<OrderItem> ItemList = new ArrayList<>();
        for (int i = 0; i < newOrderReq.product_item_list.stream().count(); i++) {
            ItemList.add(new OrderItem(newOrder.getId().toString(),newOrderReq.product_item_list.get(i)));
        }
        orderItemRepository.saveAll(ItemList);
        ItemList.parallelStream().map(
                orderItem -> productService.updateAfterOrder(new UpdateAfterOrderReq("NEW_ORDER", orderItem.getAmount(), orderItem.getProductId()))
        );
        return new NormalRes("200", "New Order Inserted",  newOrder.getId().toString());
    }
    public List<Order> loadAllOrder(){
        return (List<Order>) orderRepository.findAll();
    }

    public GetOrderRes getOrderById(String id) throws Error {
        Optional<Order> result =  orderRepository.findById(UUID.fromString(id));
        if (result.isEmpty()){
            return new GetOrderRes("404", "Not Found", null);
        }
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(result.get().getId().toString());
        return new GetOrderRes("200", "Get Order By ID", new OrderWithItems(result.get(), orderItems) );
    }

    public NormalRes updateStatus(UpdateStatusReq updateStatusReq) throws Error{
        Optional<Order> item = orderRepository.findById(UUID.fromString(updateStatusReq.id));
        if (item.isEmpty()){
            return new  NormalRes("404", "Not found", "");
        }
        item.get().setOrderStatus(updateStatusReq.orderStatus);
        orderRepository.save(item.get());
        return new NormalRes("200", "Updated", item.get().getOrderStatus().toString());
    }

    public GetOrdersRes getOrderByCustomerId(String customerId) throws Error{
        List<Order> orders = orderRepository.findAllByCustomerId(customerId);
        if (orders.isEmpty()){
            return new GetOrdersRes("404", "Not Found", null);
        }
        List<OrderWithItems> result = orders.parallelStream().map(
                order -> {
                    Order temp = orderRepository.findById(order.getId()).get();
                    List<OrderItem> items = orderItemRepository.findAllByOrderId(String.valueOf(order.getId()));
                    return new OrderWithItems(temp, items);
                }
        ).collect(Collectors.toList());
        return new GetOrdersRes("200", "Get Order By ID", result);
    }

    public NormalRes cancelOrder(String id) throws Error {
        Optional<Order> order = orderRepository.findById(UUID.fromString(id));
        if(order.isEmpty()){
            return new NormalRes("404", "Not found order with given Id: " + id, "");
        }
        if (order.get().getOrderStatus() == OrderStatus.CANCEL){
            return new NormalRes("404", "Already canceled order Id: " + id, "");
        }

        shipmentService.cancelShipmentByOrderId(id);
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(id);
        orderItems.parallelStream().map(
                orderItem -> productService.updateAfterOrder(new UpdateAfterOrderReq("CANCEL_ORDER", orderItem.getAmount(), orderItem.getProductId()))
        );
        order.get().setOrderStatus(OrderStatus.CANCEL);
        orderRepository.save(order.get());
        return new NormalRes("200", "successfully cancel rder Id: " + id, "");
    }
}
