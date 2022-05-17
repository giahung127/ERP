package com.erp.scm.controller.response;

public class NewProductItemRes {
    public String productId;
    public Float price;

    public NewProductItemRes(String productId, Float price){
        this.productId = productId;
        this.price = price;
    }
}
