package com.erp.scm.controller.response;

import com.erp.scm.entity.Product;

import java.util.Optional;

public class ProductWithCategoryName {
    public String        id;
    public String      code;
    public String      name;
    public String      category_id;
    public Float       price;
    public String      description;
    public String      categoryName;
    public ProductWithCategoryName(Product product, String categoryName){
        this.id = product.getId().toString();
        this.code = product.getCode();
        this.name = product.getName();
        this.category_id = product.getCategory_id();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.categoryName = categoryName;
    }

    public ProductWithCategoryName(Optional<Product> product, String categoryName){
        this.id = product.get().getId().toString();
        this.code = product.get().getCode();
        this.name = product.get().getName();
        this.category_id = product.get().getCategory_id();
        this.price = product.get().getPrice();
        this.description = product.get().getDescription();
        this.categoryName = categoryName;
    }
}
