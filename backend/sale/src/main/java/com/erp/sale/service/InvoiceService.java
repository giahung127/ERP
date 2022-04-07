package com.erp.sale.service;

import com.erp.sale.controller.request.NewInvoiceReq;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.*;
import com.erp.sale.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private PriceListItemRepository priceListItemRepository;
    @Autowired
    private OrderToInvoiceRepository orderToInvoiceRepository;

    public NormalRes newInvoice(NewInvoiceReq newInvoiceReq) throws Error{
        if (newInvoiceReq.orderIdList.isEmpty()){
            new NormalRes("400", "Empty request", "");
        }
        double totalPrice = 0;
        double totalDiscount = 0;
        double totalTax = 0;
        for (String orderId:newInvoiceReq.orderIdList){
            Optional<Order> order = orderRepository.findById(UUID.fromString(orderId));
            if (order.isEmpty()){
                return new NormalRes("404", "Found no record while transfer to invoice", "");
            }
            // Get PriceList
            String priceListId = order.get().getPriceListId();
            // Get all item to find out list of productId
            List<OrderItem> itemList = orderItemRepository.findAllByOrderId(order.get().getId().toString());
            List<PriceListItem> priceListItems = itemList.parallelStream().map(
                    orderItem -> (priceListItemRepository.findPriceListItemByPriceListIdAndPriceListId(orderItem.getId().toString(), priceListId)).get()
            ).collect(Collectors.toList());
            // From productIdList get priceList
            double partialPrice = 0;
            for (PriceListItem priceListItem : priceListItems) {
                partialPrice += priceListItem.getPrice();
            }
            double partialDiscount = partialPrice*(order.get().getDiscount())/100.0f;
            double partialTax = partialPrice*(order.get().getTax())/100.0f;
            totalPrice += partialPrice;
            totalDiscount += partialDiscount;
            totalTax += partialTax;
        }
        Invoice newInvoice = invoiceRepository.save(new Invoice(totalDiscount,totalTax, totalPrice));
        for (String orderId:newInvoiceReq.orderIdList){
            orderToInvoiceRepository.save(new OrderToInvoice(orderId, newInvoice.getId().toString()));
        }
        return new NormalRes("200", "Inserted new Invoice", newInvoice.getId().toString());
    }


}
