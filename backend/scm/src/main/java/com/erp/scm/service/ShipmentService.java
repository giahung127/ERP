package com.erp.scm.service;

import com.erp.scm.controller.request.NewShipmentReq;
import com.erp.scm.controller.request.UpdateShipmentReq;
import com.erp.scm.controller.response.GetShipmentByIdRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.entity.Shipment;
import com.erp.scm.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShipmentService {
    @Autowired
    private ShipmentRepository shipmentRepository;

    public NormalRes newShipment(NewShipmentReq newShipmentReq) throws Error{
        Shipment temp =  shipmentRepository.save(new Shipment(newShipmentReq));
        return new NormalRes("200", "Inserted new Shipment", temp.getId().toString());
    }


    public List<Shipment> loadAll() throws Error {
        return shipmentRepository.findAll();
    }


    public GetShipmentByIdRes getById(String id) throws Error{
        Optional<Shipment> temp =  shipmentRepository.findById(UUID.fromString(id));
        if (temp.isEmpty()){
            return new GetShipmentByIdRes("404", "No record in DB", null);
        }
        return new GetShipmentByIdRes("200", "Found record of Shipment", temp);
    }

    public NormalRes updateById(UpdateShipmentReq updateShipmentReq) throws Error{

        Optional<Shipment> temp = shipmentRepository.findById(UUID.fromString(updateShipmentReq.id));
        if (temp.isEmpty()){
            return new NormalRes("404", "No record in DB", "");
        }
        temp.get().setTransporter_id(updateShipmentReq.transporter_id);
        temp.get().setOrder_id(updateShipmentReq.order_id);
        temp.get().setTo_address(updateShipmentReq.to_address);
        temp.get().setShipment_type(updateShipmentReq.shipment_type);
        temp.get().setTo_date(updateShipmentReq.to_date);
        temp.get().setStatus(updateShipmentReq.status);

        shipmentRepository.save(temp.get());
        return new NormalRes("200", "Updated", "");
    }
}
