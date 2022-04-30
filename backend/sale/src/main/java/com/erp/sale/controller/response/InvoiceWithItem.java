package com.erp.sale.controller.response;

import com.erp.sale.entity.Invoice;
import com.erp.sale.entity.OrderToInvoice;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class InvoiceWithItem {
    public Invoice invoice;
    public List<OrderToInvoice> items;
}
