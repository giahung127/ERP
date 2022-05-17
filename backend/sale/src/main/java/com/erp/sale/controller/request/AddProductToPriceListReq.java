package com.erp.sale.controller.request;

public class AddProductToPriceListReq {
    public String productId;
    public String priceListId;
    public Float  price;

    public  AddProductToPriceListReq(String productId, String priceListId, Float price){
        this.productId = productId;
        this.priceListId = priceListId;
        this.price = price;
    }
}
