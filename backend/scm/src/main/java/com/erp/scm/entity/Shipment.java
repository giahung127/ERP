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
    private String code;
    private String transporterId;
    private String receiverName;
    private String contactNumber;
    private String contactAddress;
    private String customerName;
    private String orderId;
    private float  totalPrice;
    private String shipmentCode;
    private Date   createdDate;
    private String creatorName;
    private ShipmentStatus shipmentStatus;

    public Shipment(NewShipmentReq newShipmentReq){
        this.code = newShipmentReq.code;
        this.transporterId = newShipmentReq.transporter_id;
        this.receiverName = newShipmentReq.receiver_name;
        this.contactNumber = newShipmentReq.contact_number;
        this.contactAddress = newShipmentReq.contact_address;
        this.customerName = newShipmentReq.customer_name;
        this.totalPrice = newShipmentReq.total_price;
        this.shipmentCode = newShipmentReq.shipment_code;
        this.createdDate = newShipmentReq.created_date;
        this.creatorName = newShipmentReq.creator_name;
        this.shipmentStatus = newShipmentReq.shipment_status;
    }
}
