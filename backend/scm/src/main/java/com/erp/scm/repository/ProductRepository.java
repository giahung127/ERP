package com.erp.scm.repository;

import com.erp.scm.controller.response.ProductNameAndCodeRes;
import com.erp.scm.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(UUID id);


    String FIND_NAME = "SELECT name,code FROM Product p WHERE p.id =:productId";
    @Query(value = FIND_NAME, nativeQuery = true)
    Tuple findProductNameAndCodeById(String productId);
}