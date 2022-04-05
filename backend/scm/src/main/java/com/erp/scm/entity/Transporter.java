package com.erp.scm.entity;

import com.erp.scm.controller.request.NewTransporterReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Transporter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID    id;
    private String 	transporterName;
    private String  phone;
    private String  address;
    private String  description;

    public Transporter(NewTransporterReq newTransporterReq){
        this.transporterName = newTransporterReq.transporterName;
        this.phone = newTransporterReq.phone;
        this.address = newTransporterReq.address;
        this.description = newTransporterReq.description;
    }
}
