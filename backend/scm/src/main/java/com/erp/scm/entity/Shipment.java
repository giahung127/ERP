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
    private String transporterId;
    private String orderId;
    private String toAddress;
    private String shipmentType;
    private Date   toDate;
    private ShipmentStatus shipmentStatus;

    public Shipment(NewShipmentReq newShipmentReq){
        this.transporterId = newShipmentReq.transporter_id;
        this.orderId = newShipmentReq.order_id;
        this.toAddress = newShipmentReq.to_address;
        this.shipmentType = newShipmentReq.shipment_type;
        this.toDate = newShipmentReq.to_date;
        this.shipmentStatus = ShipmentStatus.IN_STOCK;
    }
}
