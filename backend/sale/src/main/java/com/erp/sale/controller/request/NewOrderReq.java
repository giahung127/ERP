package com.erp.sale.controller.request;

import java.sql.Date;
import java.util.List;

public class NewOrderReq {
    public String          creator_name;
    public String          price_list_id;
    public Float           total_include_tax;
    public Float           total_exclude_tax;
    public Float           tax;
    public Float           discount;
    public Float           shipping_fee;
    public String          address;
    public Date            create_date;
    public String          customer_id;
    public String          customer_name;
    public List<OrderItemReq> product_item_list;
}