package com.erp.sale.controller.response.related;

import com.erp.sale.entity.PriceListItem;
import com.erp.sale.service.api.response.ProductNameAndCodeRes;
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
    public String productCode;
    public PriceListItemWithName(PriceListItem priceListItem, ProductNameAndCodeRes productNameAndCodeRes){
        this.priceListId = priceListItem.getPriceListId();
        this.productId = priceListItem.getProductId();
        this.price = priceListItem.getPrice();
        this.productName = productNameAndCodeRes.productName;
        this.productCode = productNameAndCodeRes.productCode;
    }
}
