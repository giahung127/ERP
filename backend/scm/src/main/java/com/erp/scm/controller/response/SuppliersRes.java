package com.erp.scm.controller.response;

import com.erp.scm.entity.Supplier;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class SuppliersRes {
    public String code;
    public String message;
    public List<Supplier> suppliers;
}
