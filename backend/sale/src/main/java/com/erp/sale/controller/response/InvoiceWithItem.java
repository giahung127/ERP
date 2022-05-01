package com.erp.sale.controller.response;

import com.erp.sale.entity.Invoice;
import com.erp.sale.entity.OrderToInvoice;
import com.erp.sale.entity.enumType.InvoiceStatus;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
public class InvoiceWithItem {
    public UUID id;
    public String code;
    public double totalTax;
    public double totalDiscount;
    public double totalPrice;
    public InvoiceStatus invoiceStatus;
    public List<String> orderIds;
    public InvoiceWithItem(Invoice invoice, List<String> orderIds ){
        this.id = invoice.getId();
        this.code = invoice.getCode();
        this.totalTax = invoice.getTotalTax();
        this.totalDiscount = invoice.getTotalDiscount();
        this.totalPrice = invoice.getTotalPrice();
        this.invoiceStatus = invoice.getInvoiceStatus();
        this.orderIds = orderIds;
    }
}
