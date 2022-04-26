package com.erp.scm.controller.response;

import com.erp.scm.entity.Supplier;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class GetSupplierByIdRes {
    public String code;
    public String message;
    public Supplier supplier;
}
