package com.erp.sale.service;

import com.erp.sale.controller.OrderStatus;
import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.request.UpdateStatusReq;
import com.erp.sale.controller.response.GetListOrderRes;
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
    private OrderToInvoiceRepository orderToInvoiceRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ShipmentService shipmentService;
    @Autowired
    private ProductService productService;

    public NormalRes newOrder(NewOrderReq newOrderReq) throws Error {
        Order newOrder;
        List<Order> orderList = orderRepository.findAll();
        String sequencePart = ("000000" + (orderList.size() + 1));
        String newOrdCode = "ORD" + sequencePart.substring(sequencePart.length() - 6);
        newOrderReq.code = newOrdCode;
        newOrder = orderRepository.save(new Order(newOrderReq));
        List<OrderItem> ItemList = new ArrayList<>();
        for (int i = 0; i < newOrderReq.product_item_list.stream().count(); i++) {
            ItemList.add(new OrderItem(newOrder.getId().toString(),newOrderReq.product_item_list.get(i)));
        }
        orderItemRepository.saveAll(ItemList);
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
        String invoiceId = orderToInvoiceRepository.findInvoiceId(result.get().getId().toString());
        if(invoiceId != null){
            result.get().setInvoiceId(invoiceId);
        }
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(result.get().getId().toString());
        return new GetOrderRes("200", "Get Order By ID", new OrderWithItems(result.get(), orderItems) );
    }

    public GetOrdersRes getOrderByStatus(OrderStatus orderStatus) throws Error {
        System.out.println(orderStatus);
        List<Order> orders = orderRepository.findAllByOrderStatus(orderStatus);
        if (orders.isEmpty()){
            return new GetOrdersRes("404", "Not Found", null);
        }
//        String invoiceId = orderToInvoiceRepository.findInvoiceId(result.get().getId().toString());
//        if(invoiceId != null){
//            result.get().setInvoiceId(invoiceId);
//        }
        List<OrderWithItems> result = orders.parallelStream().map(
            order -> {
                Order temp = orderRepository.findById(order.getId()).get();
                String invoiceId = orderToInvoiceRepository.findInvoiceId(order.getId().toString());
                if(invoiceId != null){
                    temp.setInvoiceId(invoiceId);
                }
                List<OrderItem> items = orderItemRepository.findAllByOrderId(String.valueOf(order.getId()));
                return new OrderWithItems(temp, items);
            }
        ).collect(Collectors.toList());
        return new GetOrdersRes("200", "Get Order By Status", result);
    }

    public NormalRes updateStatus(UpdateStatusReq updateStatusReq) throws Error{
        Optional<Order> item = orderRepository.findById(UUID.fromString(updateStatusReq.id));
        if (item.isEmpty()){
            return new  NormalRes("404", "Not found", "");
        }
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(item.get().getId().toString());

        if(updateStatusReq.orderStatus == OrderStatus.CONFIRMED){
            orderItems.forEach(
                orderItem -> {
                    productService
                            .updateAfterOrder(new UpdateAfterOrderReq(
                                    "NEW_ORDER", orderItem.getAmount(),
                                    orderItem.getProductId(), updateStatusReq.id));
                }
            );
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
                String invoiceId = orderToInvoiceRepository.findInvoiceId(order.getId().toString());
                if(invoiceId != null){
                    temp.setInvoiceId(invoiceId);
                }
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

        productService.updateAfterOrder(new UpdateAfterOrderReq("CANCEL_ORDER", 0, null, id));

        order.get().setOrderStatus(OrderStatus.CANCEL);
        orderRepository.save(order.get());
        return new NormalRes("200", "successfully cancel order Id: " + id, "");
    }

    public GetOrdersRes getOrderByIds(List<String> listId) throws Error{
        Collection<UUID> ids = new ArrayList<>();
        listId.forEach((id) -> {
            ids.add(UUID.fromString((id)));
        });
        List<Order> orders = orderRepository.findByIdIn(ids);
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
        return new GetOrdersRes("200", "Get Order By IDs", result);
    }
}
