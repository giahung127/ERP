package com.erp.scm.controller.response;

public class LoadProductRes {
    public String code;
    public String message;
    public ProductWithCategoryName productWithCategoryName;

    public LoadProductRes(String c, String m, ProductWithCategoryName item){
        this.code = c;
        this.message = m;
        this.productWithCategoryName = item;
    }
}
