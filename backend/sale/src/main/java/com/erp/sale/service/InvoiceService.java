package com.erp.sale.service;

import com.erp.sale.controller.request.NewInvoiceReq;
import com.erp.sale.controller.response.InvoiceWithItem;
import com.erp.sale.controller.response.InvoiceWithItemRes;
import com.erp.sale.controller.response.InvoicesWithItemRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.*;
import com.erp.sale.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private OrderRepository orderRepository;
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
            totalPrice += order.get().getTotalExcludeTax();
            totalDiscount += order.get().getDiscount();
            totalTax += order.get().getTax();
        }
        Invoice newInvoice = invoiceRepository.save(new Invoice(totalDiscount,totalTax, totalPrice));
        for (String orderId:newInvoiceReq.orderIdList){
            orderToInvoiceRepository.save(new OrderToInvoice(orderId, newInvoice.getId().toString()));
        }
        return new NormalRes("200", "Inserted new Invoice", newInvoice.getId().toString());
    }

    public InvoicesWithItemRes getAll() throws Error {
        List<Invoice> invoiceList = invoiceRepository.findAll();
        if (invoiceList.isEmpty()){
            return new InvoicesWithItemRes("404", "found no invoice", null);
        }
        List<InvoiceWithItem> result = new ArrayList<>();
        for (Invoice invoice:invoiceList){
            List<OrderToInvoice> curItems = orderToInvoiceRepository.findAllByInvoiceId(String.valueOf(invoice.getId()));
            if (curItems.isEmpty()){
                return new InvoicesWithItemRes("404", "found no items in Invoice Id: " + invoice.getId(), null);
            }
            result.add(new InvoiceWithItem(invoice, curItems));
        }
        return new InvoicesWithItemRes("200", "Found all invoices", result);
    }

    public InvoiceWithItemRes getById(String id) throws Error {
        System.out.println(id);
        Optional<Invoice> invoice = invoiceRepository.findById(UUID.fromString(id));
        System.out.println("ok here");
        if (invoice.isEmpty()){
            return new InvoiceWithItemRes("404", "cannot found Invoice Id: " + invoice.get().getId(), null);
        }
        List<OrderToInvoice> curItems = orderToInvoiceRepository.findAllByInvoiceId(String.valueOf(invoice.get().getId()));
        if (curItems.isEmpty()){
            return new InvoiceWithItemRes("404", "found no items in Invoice Id: " + invoice.get().getId(), null);
        }
        return new InvoiceWithItemRes("200", "Found all invoices", new InvoiceWithItem(invoice.get(), curItems));
    }
}