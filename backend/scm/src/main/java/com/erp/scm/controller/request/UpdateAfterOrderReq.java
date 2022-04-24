package com.erp.scm.controller.request;

import com.sun.istack.NotNull;

public class UpdateAfterOrderReq {
    @NotNull
    public String type;
    @NotNull
    public int amount;
    @NotNull
    public String product_id;
}
