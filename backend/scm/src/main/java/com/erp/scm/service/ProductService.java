package com.erp.scm.service;

import com.erp.scm.controller.NewProductReq;
import com.erp.scm.controller.NewProductRes;
import com.erp.scm.entity.Product;
import com.erp.scm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    Product temp;
    public NewProductRes newProduct(NewProductReq newProductReq) {
        try {
            temp = productRepository.save(new Product(newProductReq));
        } catch (Exception e){
            throw e;
        }
        return new NewProductRes("200", "New product inserted", temp.getId().toString());
    }

    public List<Product> loadAllProduct(){
        try {
            return (List<Product>) productRepository.findAll();
        }catch (Error e){
            throw e;
        }
    }

    public Page<Product> loadPageProduct(PageRequest sort) {
        try{
            Page<Product> result = productRepository.findAll(sort);
            return result;
        }catch (Error e){
            throw e;
        }
    }

    public Optional<Product> loadByID(UUID ID){
        try{
            Optional<Product> result = productRepository.findById(ID);
            return result;
        }catch (Error e){
            throw e;
        }
    }

    public NewProductRes findByIDAndUpdate(Product updateProductReq) {
        Optional<Product> result =  productRepository.findById(updateProductReq.getId());
        if (result.isEmpty()){
            return new NewProductRes("404", "Found no Product", "");
        }

        result.get().setName(updateProductReq.getName());
        result.get().setCode(updateProductReq.getCode());
        result.get().setDescription(updateProductReq.getDescription());
        result.get().setPrice(updateProductReq.getPrice());
        result.get().setCategoryId(updateProductReq.getCategoryId());
        try {
            productRepository.save(result.get());
        } catch (Error e){
            throw e;
        }
        return new NewProductRes("200", "Updated Product", result.get().getId().toString());
    }

    public ResponseEntity<String> deleteProduct(UUID ID){
        Optional<Product> result = productRepository.findById(ID);
        try {
            productRepository.delete(result.get());
        } catch (Error e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Deleted product - ID " + ID);
    }
}
