package com.erp.sale.controller.response.related;

import com.erp.sale.entity.PriceListItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PriceListItemWithName {
    PriceListItem priceListItem;
    String        productName;
}
