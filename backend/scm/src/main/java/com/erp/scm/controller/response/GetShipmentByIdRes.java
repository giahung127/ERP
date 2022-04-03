package com.erp.scm.controller.response;

import com.erp.scm.entity.Shipment;

import java.util.Optional;

public class GetShipmentByIdRes {
    public String status;
    public String message;
    public Optional<Shipment> customer;

    public GetShipmentByIdRes(String s, String m, Optional<Shipment> c){
        this.message = m;
        this.status = s;
        this.customer = c;
    }
}
