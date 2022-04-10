package com.erp.scm.service;

import com.erp.scm.controller.request.NewProductReq;
import com.erp.scm.controller.response.NewProductRes;
import com.erp.scm.controller.response.ProductWithCategoryName;
import com.erp.scm.entity.Category;
import com.erp.scm.entity.Product;
import com.erp.scm.repository.CategoryRepository;
import com.erp.scm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public NewProductRes newProduct(NewProductReq newProductReq) {
        Product temp;
        try {
            temp = productRepository.save(new Product(newProductReq));
        } catch (Exception e){
            throw e;
        }
        return new NewProductRes("200", "New product inserted", temp.getId().toString());
    }

    public List<ProductWithCategoryName> loadAllProduct(){
        try {
            List<Product> productList = productRepository.findAll();
            List<String> categoryList = productList.parallelStream().map(
                    product -> {
                        if (product.getCategory_id() != null){
                            Optional<Category> temp = categoryRepository.findById(UUID.fromString(product.getCategory_id()));
                            return temp.get().getName();
                        }
                        else{
                            return "Non Category";
                        }
                    }
            ).collect(Collectors.toList());
            List<ProductWithCategoryName> resultList = new ArrayList<>();
            for (int i = 0; i< categoryList.size(); i++){
                resultList.add(new ProductWithCategoryName(productList.get(i), categoryList.get(i)));
            }
            return resultList;
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

    public ProductWithCategoryName loadByID(UUID ID){
        try{
            Optional<Product> result = productRepository.findById(ID);
            String categoryName;
            if (result.get().getCategory_id() != null){
                Optional<Category> temp = categoryRepository.findById(UUID.fromString(result.get().getCategory_id()));
                categoryName=  temp.get().getName();
            }
            else{
                categoryName = "Non Category";
            }
            return new ProductWithCategoryName(result,categoryName);
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
        result.get().setCategory_id(updateProductReq.getCategory_id());
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

    public String getProductNameById(String productId) throws Error {
        String name = productRepository.findProductNameById(productId);
        System.out.println(productId);
        if (name.isEmpty()){
            return "Not found";
        }
        return name;
    }
}
