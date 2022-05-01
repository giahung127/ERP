package com.erp.sale.controller.response;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class InvoicesWithItemRes {
    public String code;
    public String message;
    public List<InvoiceWithItem> data;
}
