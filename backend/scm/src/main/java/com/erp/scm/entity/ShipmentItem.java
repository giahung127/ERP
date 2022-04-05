package com.erp.scm.entity;

import com.erp.scm.controller.request.ShipmentItemReqPart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CompositeKey.class)
public class ShipmentItem {
    @Id
    private String productId;
    @Id
    private String shipmentId;
    private int   amount;
    public ShipmentItem(String shipment_id ,ShipmentItemReqPart itemReqPart){
        this.productId = itemReqPart.product_id;
        this.shipmentId = shipment_id;
        this.amount = itemReqPart.amount;
    }
}