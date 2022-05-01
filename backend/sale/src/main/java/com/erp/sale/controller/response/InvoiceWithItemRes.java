package com.erp.sale.controller.response;

import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class InvoiceWithItemRes {
    public String code;
    public String message;
    public InvoiceWithItem data;
}
