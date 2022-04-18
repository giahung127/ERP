package com.erp.scm.controller.response;

import com.erp.scm.entity.Shipment;

import java.util.List;

public class GetListShipment {
    public String status;
    public String message;
    public List<Shipment> data;

    public GetListShipment(String s, String m, List<Shipment> data){
        this.message = m;
        this.status = s;
        this.data = data;
    }
}
