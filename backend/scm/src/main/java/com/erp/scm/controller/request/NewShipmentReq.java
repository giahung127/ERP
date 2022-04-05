package com.erp.scm.controller.request;
import java.util.Date;
import java.util.List;

public class NewShipmentReq {
    public String transporter_id;
    public String order_id;
    public String to_address;
    public String shipment_type;
    public Date to_date;
    public List<ShipmentItemReqPart> shipmen_item_list;
}
