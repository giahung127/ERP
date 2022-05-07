package com.erp.scm.controller.response;

import java.util.List;

public class GetSupplementRes {
    public String code;
    public String message;
    public SupplementWithItems data;

    public GetSupplementRes(String code, String message, SupplementWithItems data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
