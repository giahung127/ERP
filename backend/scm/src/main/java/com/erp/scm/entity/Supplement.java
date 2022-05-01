package com.erp.scm.entity;

import com.erp.scm.controller.request.NewSupplementReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Supplement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private String code;
    private String supplierId;
    private String createdBy;
    private Date date;
    private float total;

    public Supplement(NewSupplementReq supplement){
        this.code = supplement.code;
        this.supplierId = supplement.supplier_id;
        this.createdBy = supplement.created_by;
        this.date = supplement.date;
        this.total = supplement.total;
    }
}
