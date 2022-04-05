package com.erp.scm.controller.request;

import com.erp.scm.controller.status.ShipmentStatus;

import java.util.Date;
import java.util.UUID;

public class UpdateShipmentReq {
    public String id;
    public String transporter_id;
    public String order_id;
    public String to_address;
    public String shipment_type;
    public Date to_date;
    public ShipmentStatus status;
}
