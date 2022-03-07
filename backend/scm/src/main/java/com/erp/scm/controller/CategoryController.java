package com.erp.scm.controller;

import com.erp.scm.entity.Category;
import com.erp.scm.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    public ResponseEntity<String> addProduct(@RequestBody NewCategoryReq newCategoryReq){
        return categoryService.newCategory(newCategoryReq);
    }

    @GetMapping("/loadAll")
    public List<Category> getAllProduct(){
        return categoryService.loadAllCategory();
    }

    @GetMapping("/getById/{id}")
    public Optional<Category> getProductById(@PathVariable long id){
        return categoryService.loadByID(id);
    }

    @PostMapping("/updateById")
    public ResponseEntity<String> upDateByID(@RequestBody Category updateData){
        return categoryService.findByIDAndUpdate(updateData);
    }

    @PostMapping("/deleteByID/{id}")
    public ResponseEntity<String> deleteById(@PathVariable long id){
        return categoryService.deleteCategory(id);
    }
}
