package com.erp.scm.service;

import com.erp.scm.controller.request.NewProductReq;
import com.erp.scm.controller.request.UpdateAfterOrderReq;
import com.erp.scm.controller.response.NewProductRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.controller.response.ProductNameAndCodeRes;
import com.erp.scm.controller.response.ProductWithCategoryName;
import com.erp.scm.entity.Category;
import com.erp.scm.entity.Product;
import com.erp.scm.entity.Shipment;
import com.erp.scm.repository.CategoryRepository;
import com.erp.scm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import javax.persistence.TupleElement;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public NewProductRes newProduct(NewProductReq newProductReq) {
        if(Objects.equals(newProductReq.code, "")) {
            List<Product> productList = productRepository.findAll();
            String sequencePart = ("000000" + (productList.size() + 1));
            newProductReq.code = "PRD" + sequencePart.substring(sequencePart.length() - 6);
        }
        Product temp;
        try {
            temp = productRepository.save(new Product(newProductReq));
        } catch (Exception e){
            throw e;
        }
        return new NewProductRes("200", "New product inserted", temp.getId().toString());
    }

    public List<ProductWithCategoryName> loadAllProduct() throws Error{
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
        result.get().setCode(updateProductReq.getCode());
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

    public ProductNameAndCodeRes getProductNameAndCodeById(String productId) throws Error {
        Tuple productNameAndCode = productRepository.findProductNameAndCodeById(productId);
        return new ProductNameAndCodeRes((String) productNameAndCode.get(0), (String) productNameAndCode.get(1)) ;
    }


    public NormalRes updateAfterOrder(UpdateAfterOrderReq updateAfterOrderReq) throws Error {
        Optional<Product> temp = productRepository.findById(UUID.fromString(updateAfterOrderReq.product_id));
        if (temp.isEmpty()){
            return new NormalRes("404", "Not found related product", "");
        }
        System.out.println(updateAfterOrderReq);
        if (Objects.equals(updateAfterOrderReq.type, "NEW_ORDER")){
            if (updateAfterOrderReq.amount > temp.get().getAmount()){
                return new NormalRes("404", "Insufficient amount", temp.get().getCode());
            }
            System.out.println(temp.get().getAmount() + ',' + updateAfterOrderReq.amount);
            temp.get().setAmount(temp.get().getAmount() - updateAfterOrderReq.amount);
            productRepository.save(temp.get());
        }
        if (Objects.equals(updateAfterOrderReq.type, "CANCEL_ORDER")){
            temp.get().setAmount(temp.get().getAmount() + updateAfterOrderReq.amount);
            productRepository.save(temp.get());
        }
        return new NormalRes("200", "Updated amount of Product", "" + temp.get().getAmount());
    }
}