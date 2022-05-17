package com.erp.scm.controller.response;

import java.util.List;

public class NewListProductRes {
    public String code;
    public String message;
    public List<NewProductItemRes> data;

    public NewListProductRes(String code, String message, List<NewProductItemRes> data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
