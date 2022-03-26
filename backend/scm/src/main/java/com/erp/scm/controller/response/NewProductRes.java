package com.erp.scm.controller.response;

public class NewProductRes {
    public String code;
    public String message;
    public String data;

    public NewProductRes(String code, String message, String data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}