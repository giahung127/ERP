package com.erp.sale.controller.response;

import com.erp.sale.entity.Order;

import java.util.List;

public class GetListOrderRes {
    public String code;
    public String message;
    public List<Order> data;

    public GetListOrderRes(String code, String message, List<Order> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
