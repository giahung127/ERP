package com.erp.scm.controller.response;

import com.erp.scm.controller.status.ShipmentStatus;
import com.erp.scm.entity.Shipment;
import com.erp.scm.entity.ShipmentItem;

import java.util.Date;
import java.util.List;

public class ShipmentWithItems {
    public String id;
    public String transporterId;
    public String receiverName;
    public String contactNumber;
    public String contactAddress;
    public String customerName;
    public String orderId;
    public float  totalPrice;
    public String shipmentCode;
    public Date   createdDate;
    public String creatorName;
    public ShipmentStatus status;
    public List<ShipmentItem> shipmen_item_list;



    public ShipmentWithItems(Shipment shipment, List<ShipmentItem> itemList){
        this.id = String.valueOf(shipment.getId());
        this.transporterId = shipment.getTransporterId();
        this.receiverName = shipment.getReceiverName();
        this.contactNumber = shipment.getContactNumber();
        this.contactAddress = shipment.getContactAddress();
        this.customerName = shipment.getCustomerName();
        this.orderId = shipment.getOrderId();
        this.totalPrice = shipment.getTotalPrice();
        this.shipmentCode = shipment.getShipmentCode();
        this.createdDate = shipment.getCreatedDate();
        this.creatorName = shipment.getCreatorName();
        this.status = shipment.getShipmentStatus();
        this.shipmen_item_list = itemList;
    }
}
