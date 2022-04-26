package com.erp.scm.controller.request;
import com.erp.scm.controller.status.ShipmentStatus;

import java.util.Date;
import java.util.List;

public class NewShipmentReq {
    public String transporter_id;
    public String receiver_name;
    public String contact_number;
    public String contact_address;
    public String customer_name;
    public String order_id;
    public float  total_price;
    public String shipment_code;
    public Date   created_date;
    public String creator_name;
    public ShipmentStatus shipment_status;
    public List<ShipmentItemReqPart> shipmen_item_list;
}
