package com.erp.sale.service.api.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UpdateAfterOrderReq {
    public String type;
    public int amount;
    public String product_id;
    public String order_id;
}
