package com.erp.hrm.controller.response;

public class NormalRes {
    public String code;
    public String message;
    public String data;

    public NormalRes(String code, String message, String data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
