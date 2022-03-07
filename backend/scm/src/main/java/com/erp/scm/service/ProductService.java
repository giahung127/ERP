package com.erp.scm.service;

import com.erp.scm.controller.NewProductReq;
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

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<String> newProduct(NewProductReq newProductReq) {
        try {
            productRepository.save(new Product(newProductReq));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Inserted new product");
    }

    public List<Product> loadAllProduct(){
        return (List<Product>) productRepository.findAll();
    }

    public Page<Product> loadPageProduct(PageRequest sort) {
        Page<Product> result = productRepository.findAll(sort);
        return result;
    }

    public Optional<Product> loadByID(long ID){
        Optional<Product> result = productRepository.findById(ID);
        return result;
    }

    public ResponseEntity<String> findByIDAndUpdate(Product updateProductReq) {
        Optional<Product> result =  productRepository.findById(updateProductReq.getId());
        if (result.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Found No Data");
        }

        result.get().setName(updateProductReq.getName());
        result.get().setCode(updateProductReq.getCode());
        result.get().setDescription(updateProductReq.getDescription());
        result.get().setPrice(updateProductReq.getPrice());
        result.get().setCategory(updateProductReq.getCategory());
        try {
            productRepository.save(result.get());
        } catch (Error e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Updated new product");
    }

    public ResponseEntity<String> deleteProduct(long ID){
        Optional<Product> result = productRepository.findById(ID);
        try {
            productRepository.delete(result.get());
        } catch (Error e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Deleted product - ID " + ID);
    }

}
