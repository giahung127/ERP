package com.erp.scm.entity;

import com.erp.scm.controller.request.NewShipmentReq;
import com.erp.scm.controller.status.ShipmentStatus;
import lombok.*;
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
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private String transporter_id;
    private String order_id;
    private String to_address;
    private String shipment_type;
    private Date   to_date;
    private ShipmentStatus shipmentStatus;

    public Shipment(NewShipmentReq newShipmentReq){
        this.transporter_id = newShipmentReq.transporter_id;
        this.order_id = newShipmentReq.order_id;
        this.to_address = newShipmentReq.to_address;
        this.shipment_type = newShipmentReq.shipment_type;
        this.to_date = newShipmentReq.to_date;
        this.shipmentStatus = ShipmentStatus.IN_STOCK;
    }
}
