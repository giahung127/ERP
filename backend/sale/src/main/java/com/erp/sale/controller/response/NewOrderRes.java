package com.erp.sale.controller.response;

public class NewOrderRes {
    public String code;
    public String message;
    public String data;

    public NewOrderRes(String code, String message, String data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
