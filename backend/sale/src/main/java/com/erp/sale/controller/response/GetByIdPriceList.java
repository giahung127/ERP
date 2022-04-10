package com.erp.sale.controller.response;

import com.erp.sale.controller.response.related.PriceListItemWithName;
import com.erp.sale.entity.PriceList;
import com.erp.sale.entity.PriceListItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetByIdPriceList {
    public String          price_list_id;
    public String          price_list_name;
    public String          price_list_code;
    public List<PriceListItemWithName> price_list_items;
    public GetByIdPriceList(PriceList priceList, List<PriceListItemWithName> price_list_items){
        this.price_list_id = priceList.getId().toString();
        this.price_list_name = priceList.getPriceListName();
        this.price_list_code = priceList.getPriceListCode();
        this.price_list_items = price_list_items;
    }
}