package com.erp.sale.controller.request;

import java.util.List;

public class NewPriceListReq {
    public String          price_list_name;
    public String          price_list_code;
    public List<PriceListItemReq> price_list_items;
}
