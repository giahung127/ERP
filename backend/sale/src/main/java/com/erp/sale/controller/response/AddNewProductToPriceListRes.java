package com.erp.sale.controller.response;

import lombok.Setter;

@Setter
public class AddNewProductToPriceListRes {
    public String code;
    public String message;
    public String data;

    public AddNewProductToPriceListRes(String s, String s1, String s2) {
        this.code = s;
        this.message = s1;
        this.data = s2;
    }
}
