package com.erp.sale.controller.response;

public class GetPriceListByIdRes {
    public String code;
    public String message;
    public GetByIdPriceList data;

    public GetPriceListByIdRes(String code, String message, GetByIdPriceList data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
