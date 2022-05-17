package com.erp.sale.controller.request;

import com.erp.sale.entity.PriceListItem;

import java.util.List;

public class UpdatePriceListItemReq {
    public String price_list_id;
    public List<UpdatePriceListItem> price_list_item_list;
}
