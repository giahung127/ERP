package com.erp.sale.service;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.request.UpdateStatusReq;
import com.erp.sale.controller.response.GetOrderRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.controller.response.OrderWithItems;
import com.erp.sale.entity.*;
import com.erp.sale.repository.*;
import com.erp.sale.service.api.ProductService;
import com.erp.sale.service.api.request.UpdateAfterOrderReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PriceListItemRepository priceListItemRepository;
    @Autowired
    private OrderToInvoiceRepository orderToInvoiceRepository;
    @Autowired
    private ProductService productService;

    public NormalRes newOrder(NewOrderReq newOrderReq) {
        Order newOrder;
        try {
            newOrder = orderRepository.save(new Order(newOrderReq));
            List<OrderItem> ItemList = new ArrayList<>();
            for (int i = 0; i < newOrderReq.product_item_list.stream().count(); i++) {
                ItemList.add(new OrderItem(newOrder.getId().toString(),newOrderReq.product_item_list.get(i)));
            }
            orderItemRepository.saveAll(ItemList);
            List<NormalRes> temp = ItemList.parallelStream().map(
                    orderItem -> productService.updateAfterOrder(new UpdateAfterOrderReq("NEW_ORDER", orderItem.getAmount(), orderItem.getProductId()))
            ).collect(Collectors.toList());
        } catch (Exception e){
            throw e;
        }
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

    public NormalRes toInvoice(String id) throws Error {
        Optional<Order> order = orderRepository.findById(UUID.fromString(id));
        if (order.isEmpty()){
            return new NormalRes("404", "Found no record while transfer to invoice", "");
        }
        // Get PriceList
        String priceListId = order.get().getPriceListId();
        // Get all item to find out list of productId
        List<OrderItem> itemList = orderItemRepository.findAllByOrderId(order.get().getId().toString());
        List<PriceListItem> priceListItems = itemList.parallelStream().map(
                orderItem -> (priceListItemRepository.findPriceListItemByPriceListIdAndProductId(priceListId, orderItem.getProductId())).get()
        ).collect(Collectors.toList());
        // From productIdList get priceList
        double totalPrice = 0;
        for (PriceListItem priceListItem : priceListItems) {
            totalPrice += priceListItem.getPrice();
        }
        double totalDiscount = totalPrice*(order.get().getDiscount())/100.0f;
        double totalTax = totalPrice*(order.get().getTax())/100.0f;
        Invoice newInvoice = invoiceRepository.save(new Invoice(totalDiscount,totalTax, totalPrice));
        orderToInvoiceRepository.save(new OrderToInvoice(order.get().getId().toString(), newInvoice.getId().toString()));
        return new NormalRes("200", "New Invoice is made", "");
    }


    public GetOrderRes getOrderByCustomerId(String customerId) throws Error{
        Optional<Order> order = orderRepository.findByCustomerId(customerId);
        if (order.isEmpty()){
            return new GetOrderRes("404", "Not Found", null);
        }
        List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(order.get().getId().toString());
        return new GetOrderRes("200", "Get Order By ID", new OrderWithItems(order.get(), orderItems) );
    }
}
