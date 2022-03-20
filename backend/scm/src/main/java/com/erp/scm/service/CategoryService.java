package com.erp.scm.service;

import com.erp.scm.controller.NewCategoryReq;
import com.erp.scm.controller.NewCategoryRes;
import com.erp.scm.entity.Category;
import com.erp.scm.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public NewCategoryRes newCategory(NewCategoryReq newCategoryReq) {
        Category temp;
        try {
            temp = categoryRepository.save(new Category(newCategoryReq));
        } catch (Exception e){
            throw e;
        }
        NewCategoryRes res = new NewCategoryRes("200", "New category is successfully added ", temp.getId().toString());

        return res;
    }

    public List<Category> loadAllCategory(){
        return (List<Category>) categoryRepository.findAll();
    }


    public Optional<Category> loadByID(UUID ID){
        Optional<Category> result = categoryRepository.findById(ID);
        return result;
    }

    public NewCategoryRes findByIDAndUpdate(Category updateCategory) {
        Optional<Category> result =  categoryRepository.findById(updateCategory.getId());
        if (result.isEmpty()){
            return new NewCategoryRes("404", "Category is not exist", "");
        }

        result.get().setLevel(updateCategory.getLevel());
        result.get().setParentId(updateCategory.getParentId());
        result.get().setName(updateCategory.getName());
        try {
            categoryRepository.save(result.get());
        } catch (Error e){
            throw e;
        }
        return new NewCategoryRes("200", "The category is successfully updated ", "");
    }

    public ResponseEntity<String> deleteCategory(UUID ID){
        Optional<Category> result = categoryRepository.findById(ID);
        try {
            categoryRepository.delete(result.get());
        } catch (Error e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Deleted category - ID " + ID);
    }
}
