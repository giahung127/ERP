package com.erp.scm.controller.response;

import java.util.List;

public class GetListSupplementRes {
    public String code;
    public String message;
    public List<SupplementWithItems> data;

    public GetListSupplementRes(String code, String message, List<SupplementWithItems> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
