package com.erp.sale.controller.response;

import com.erp.sale.entity.PriceList;
import com.erp.sale.entity.PriceListItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class GetByIdPriceList {
    public String          price_list_name;
    public String          price_list_code;
    public List<PriceListItem> price_list_items;
    public GetByIdPriceList(Optional<PriceList> priceList, List<PriceListItem> price_list_items){
        this.price_list_name = priceList.get().getPriceListName();
        this.price_list_code = priceList.get().getPriceListCode();
        this.price_list_items = price_list_items;
    }
}