package com.erp.sale.controller.response;

import com.erp.sale.entity.Order;

import java.util.Optional;

public class GetOrderRes {
    public String code;
    public String message;
    public OrderWithItems data;

    public GetOrderRes(String code, String message, OrderWithItems data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
