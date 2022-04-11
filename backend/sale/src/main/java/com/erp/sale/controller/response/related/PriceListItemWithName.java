package com.erp.sale.controller.response.related;

import com.erp.sale.entity.PriceListItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PriceListItemWithName {
    public String priceListId;
    public String productId;
    public Float  price;
    public String productName;
    public PriceListItemWithName(PriceListItem priceListItem, String productName){
        this.priceListId = priceListItem.getPriceListId();
        this.productId = priceListItem.getProductId();
        this.price = priceListItem.getPrice();
        this.productName = productName;
    }
}
