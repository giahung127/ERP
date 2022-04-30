package com.erp.scm.controller.request;


import com.erp.scm.controller.status.ShipmentStatus;

public class UpdateShipmentReq {
    public String id;
    public String receiver_name;
    public String contact_number;
    public String contact_address;
    public ShipmentStatus shipment_status;
    public String code;
}
