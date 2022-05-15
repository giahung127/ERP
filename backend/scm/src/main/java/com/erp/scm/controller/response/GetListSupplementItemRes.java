package com.erp.scm.controller.response;

import com.erp.scm.entity.SupplementItem;

import java.util.List;

public class GetListSupplementItemRes {
    public String code;
    public String message;
    public List<SupplementItem> data;

    public GetListSupplementItemRes(String code, String message, List<SupplementItem> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
