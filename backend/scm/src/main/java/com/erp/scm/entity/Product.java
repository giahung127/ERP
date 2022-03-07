package com.erp.scm.entity;


import com.erp.scm.controller.NewProductReq;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product", schema = "scm" )
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long    id;

    private String  code;
    private String name;
    private String  category;
    private Float  price;
    private String description;

    public Product(NewProductReq newProductReq) {
        this.code = newProductReq.code;
        this.name = newProductReq.name;
        this.category = newProductReq.category;
        this.price = newProductReq.price;
        this.description = newProductReq.description;
    }
}
