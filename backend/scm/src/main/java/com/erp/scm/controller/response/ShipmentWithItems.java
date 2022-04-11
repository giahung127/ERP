package com.erp.scm.controller.response;

import com.erp.scm.controller.request.ShipmentItemReqPart;
import com.erp.scm.entity.Shipment;
import com.erp.scm.entity.ShipmentItem;

import java.util.Date;
import java.util.List;

public class ShipmentWithItems {
    public String transporter_id;
    public String order_id;
    public String to_address;
    public String shipment_type;
    public Date to_date;
    public List<ShipmentItem> shipmen_item_list;
    
    public ShipmentWithItems(Shipment shipment, List<ShipmentItem> itemList){
        this.transporter_id = shipment.getTransporterId();
        this.order_id = shipment.getOrderId();
        this.to_address = shipment.getToAddress();
        this.shipment_type = shipment.getShipmentType();
        this.to_date = shipment.getToDate();
        this.shipmen_item_list = itemList;
    }
}
