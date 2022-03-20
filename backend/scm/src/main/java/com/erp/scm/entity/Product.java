package com.erp.scm.entity;


import com.erp.scm.controller.NewProductReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Date;
import java.util.UUID;

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
    @Type(type="uuid-char")
    private UUID id;
    private String  code;
    private String name;
    private Float  price;
    private String description;
    private UUID  categoryId;

    public Product(NewProductReq newProductReq) {
        this.code = newProductReq.code;
        this.name = newProductReq.name;
        this.categoryId = newProductReq.categoryId;
        this.price = newProductReq.price;
        this.description = newProductReq.description;
    }
}
