package com.erp.sale.service.api.request;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UpdateAfterOrderReq {
    @NotNull
    public String type;
    @NotNull
    public int amount;
    @NotNull
    public String product_id;
}
