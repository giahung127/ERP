package com.erp.scm.controller.response;

public class GetShipmentByIdRes {
    public String status;
    public String message;
    public ShipmentWithItems items;

    public GetShipmentByIdRes(String s, String m, ShipmentWithItems items){
        this.message = m;
        this.status = s;
        this.items = items;
    }
}
