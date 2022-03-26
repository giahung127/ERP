package com.erp.scm.controller.response;

public class NewCategoryRes {
    public String code;
    public String message;
    public String data;

    public NewCategoryRes(String code, String message, String data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
