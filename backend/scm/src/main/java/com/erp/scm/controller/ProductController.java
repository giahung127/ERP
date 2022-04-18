package com.erp.scm.controller;


import com.erp.scm.controller.request.GetInforReq;
import com.erp.scm.controller.request.NewProductReq;
import com.erp.scm.controller.response.NewProductRes;
import com.erp.scm.controller.response.ProductNameAndCodeRes;
import com.erp.scm.controller.response.ProductWithCategoryName;
import com.erp.scm.entity.Product;
import com.erp.scm.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public NewProductRes addProduct(@RequestBody NewProductReq newProductReq){
        return productService.newProduct(newProductReq);
    }

    @GetMapping("/loadAll")
    public List<ProductWithCategoryName> getAllProduct(){
        return productService.loadAllProduct();
    }

    @GetMapping("/getById/{id}")
    public ProductWithCategoryName getProductById(@PathVariable UUID id){
        return productService.loadByID(id);
    }

    @GetMapping("/getPage")
    public Page<Product> getPage(@RequestBody GetInforReq getInforReq){
        Integer pageNum = getInforReq.pageNum;
        Integer size = getInforReq.size;
        PageRequest sort = PageRequest.of(pageNum, size);
        return productService.loadPageProduct(sort);
    }

    @PostMapping("/updateById")
    public NewProductRes upDateByID(@RequestBody Product updateData){
        return productService.findByIDAndUpdate(updateData);
    }

    @PostMapping("/deleteByID/{id}")
    public ResponseEntity<String> deleteById(@PathVariable UUID id){
        return productService.deleteProduct(id);
    }

    @GetMapping("/getProductNameAndCode/{productId}")
    public ProductNameAndCodeRes getProductNameAndCodeById(@PathVariable String productId){
        return productService.getProductNameAndCodeById(productId);
    }


}
