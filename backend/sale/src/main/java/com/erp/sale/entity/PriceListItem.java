package com.erp.sale.entity;

import com.erp.sale.controller.request.AddProductToPriceListReq;
import com.erp.sale.controller.request.PriceListItemReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;



@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CompositeKey.class)
public class PriceListItem{
    @Id
    private String priceListId;
    @Id
    private String productId;

    private Float  price;
    private Timestamp timestamp;

    public PriceListItem(String priceListID, PriceListItemReq priceListItemReq){
        this.priceListId = priceListID;
        this.productId = priceListItemReq.product_id;
        this.price = priceListItemReq.price;
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public PriceListItem(AddProductToPriceListReq item){
        this.priceListId = item.priceListId;
        this.productId = item.productId;
        this.price    = item.price;
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

}
