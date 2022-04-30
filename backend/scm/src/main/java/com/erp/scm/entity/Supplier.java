package com.erp.scm.entity;

import com.erp.scm.controller.request.NewSupplierReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.transaction.Transactional;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private String code;
    private String name;
    private String address;
    private String phone;
    private String email;
    public Supplier(NewSupplierReq newSupplierReq){
        this.code = newSupplierReq.code;
        this.name = newSupplierReq.name;
        this.address = newSupplierReq.address;
        this.phone = newSupplierReq.phone;
        this.email = newSupplierReq.email;
    }
}
