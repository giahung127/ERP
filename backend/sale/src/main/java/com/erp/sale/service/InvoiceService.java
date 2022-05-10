package com.erp.sale.service;

import com.erp.sale.controller.OrderStatus;
import com.erp.sale.controller.request.NewInvoiceReq;
import com.erp.sale.controller.request.UpdateInvoiceStatusReq;
import com.erp.sale.controller.request.UpdateStatusReq;
import com.erp.sale.controller.response.*;
import com.erp.sale.entity.*;
import com.erp.sale.repository.*;
import com.erp.sale.service.api.request.UpdateAfterOrderReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
        List<Invoice> invoiceList = invoiceRepository.findAll();
        String sequencePart = ("000000" + (invoiceList.size() + 1));
        String newInvCode = "INV" + sequencePart.substring(sequencePart.length() - 6);
        for (String orderId:newInvoiceReq.orderIdList){
            Optional<Order> order = orderRepository.findById(UUID.fromString(orderId));
            if (order.isEmpty()){
                return new NormalRes("404", "Found no record while transfer to invoice", "");
            }
            totalPrice += order.get().getTotalExcludeTax();
            totalDiscount += order.get().getDiscount();
            totalTax += order.get().getTax()*totalPrice;
        }
        Date date = new java.sql.Date(System.currentTimeMillis());
        Invoice newInvoice = invoiceRepository.save(new Invoice(totalDiscount,totalTax,date ,  totalPrice, newInvCode));
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
            List<String> curItems = orderToInvoiceRepository.findOrderIdList(String.valueOf(invoice.getId()));
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
        List<String> curItems = orderToInvoiceRepository.findOrderIdList(String.valueOf(invoice.get().getId()));
        if (curItems.isEmpty()){
            return new InvoiceWithItemRes("404", "found no items in Invoice Id: " + invoice.get().getId(), null);
        }
        return new InvoiceWithItemRes("200", "Found invoice", new InvoiceWithItem(invoice.get(), curItems));
    }

    public InvoicesWithItemRes getInvoicesByIds(List<String> listId) throws Error {

        Collection<UUID> ids = new ArrayList<>();
        listId.forEach((id) -> {
            ids.add(UUID.fromString((id)));
        });
        List<Invoice> invoiceList = invoiceRepository.findByIdIn(ids);
        if (invoiceList.isEmpty()){
            return new InvoicesWithItemRes("404", "found no invoice", null);
        }
        List<InvoiceWithItem> result = new ArrayList<>();
        for (Invoice invoice:invoiceList){
            List<String> curItems = orderToInvoiceRepository.findOrderIdList(String.valueOf(invoice.getId()));
            if (curItems.isEmpty()){
                return new InvoicesWithItemRes("404", "found no items in Invoice Id: " + invoice.getId(), null);
            }
            result.add(new InvoiceWithItem(invoice, curItems));
        }
        return new InvoicesWithItemRes("200", "Found all invoices", result);
    }

    public NormalRes updateStatus(UpdateInvoiceStatusReq updateStatusReq) throws Error{
        if (updateStatusReq.id == null){
            return new  NormalRes("404", "No invoice found", "");
        }
        Optional<Invoice> item = invoiceRepository.findById(UUID.fromString(updateStatusReq.id));
        if (item.isEmpty()){
            return new  NormalRes("404", "Not found", "");
        }
        item.get().setInvoiceStatus(updateStatusReq.invoiceStatus);
        invoiceRepository.save(item.get());
        return new NormalRes("200", "Updated", item.get().getInvoiceStatus().toString());
    }
}