package com.erp.scm.entity;


import com.erp.scm.controller.request.NewProductReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID        id;
    private String      code;
    private String      name;
    private String      category_id;
    private Float       price;
    private String      description;
    private int         amount;

    public Product(NewProductReq newProductReq) {
        this.code = newProductReq.code;
        this.name = newProductReq.name;
        this.category_id = newProductReq.category_id;
        this.price = newProductReq.price;
        this.description = newProductReq.description;
        this.amount = 0;
    }
}
