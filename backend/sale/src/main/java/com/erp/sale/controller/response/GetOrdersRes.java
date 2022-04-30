package com.erp.sale.controller.response;

import java.util.List;

public class GetOrdersRes {
    public String code;
    public String message;
    public List<OrderWithItems> data;

    public GetOrdersRes(String code, String message, List<OrderWithItems> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
