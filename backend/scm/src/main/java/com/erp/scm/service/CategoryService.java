package com.erp.scm.service;

import com.erp.scm.controller.NewCategoryReq;
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

    public ResponseEntity<String> newCategory(NewCategoryReq newCategoryReq) {
        Category temp;
        try {
            temp = categoryRepository.save(new Category(newCategoryReq));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("inserted new category with id: " + temp.getId());
    }

    public List<Category> loadAllCategory(){
        return (List<Category>) categoryRepository.findAll();
    }


    public Optional<Category> loadByID(UUID ID){
        Optional<Category> result = categoryRepository.findById(ID);
        return result;
    }

    public ResponseEntity<String> findByIDAndUpdate(Category updateCategory) {
        Optional<Category> result =  categoryRepository.findById(updateCategory.getId());
        if (result.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Found No Data");
        }

        result.get().setLevel(updateCategory.getLevel());
        result.get().setParentId(updateCategory.getParentId());
        result.get().setName(updateCategory.getName());
        try {
            categoryRepository.save(result.get());
        } catch (Error e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD_REQUEST");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Updated category");
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
