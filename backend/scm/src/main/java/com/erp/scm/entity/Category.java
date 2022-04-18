package com.erp.scm.entity;

import com.erp.scm.controller.request.NewCategoryReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private Integer level;
    private String  parentId;
    private String  name;

    public Category(NewCategoryReq newCategoryReq) {
        this.level = newCategoryReq.level;
        this.parentId = newCategoryReq.parentId;
        this.name = newCategoryReq.name;
    }
}
