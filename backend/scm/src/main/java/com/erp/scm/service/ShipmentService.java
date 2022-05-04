package com.erp.scm.service;

import com.erp.scm.controller.request.NewShipmentReq;
import com.erp.scm.controller.request.UpdateShipmentItemReq;
import com.erp.scm.controller.request.UpdateShipmentReq;
import com.erp.scm.controller.request.UpdateShipmentStatusReq;
import com.erp.scm.controller.response.GetListShipment;
import com.erp.scm.controller.response.GetShipmentByIdRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.controller.response.ShipmentWithItems;
import com.erp.scm.controller.status.ShipmentStatus;
import com.erp.scm.entity.Shipment;
import com.erp.scm.entity.ShipmentItem;
import com.erp.scm.repository.ShipmentItemRepository;
import com.erp.scm.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class ShipmentService {
    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private ShipmentItemRepository shipmentItemRepository;

    public NormalRes newShipment(NewShipmentReq newShipmentReq) throws Error{
        List<Shipment> shipmentList = shipmentRepository.findAll();
        String sequencePart = ("000000" + (shipmentList.size() + 1));
        String newShiCode = "SHP" + sequencePart.substring(sequencePart.length() - 6);
        newShipmentReq.code = newShiCode;
        Shipment temp =  shipmentRepository.save(new Shipment(newShipmentReq));
        if (!newShipmentReq.shipmen_item_list.isEmpty()){
            List<ShipmentItem> ItemList = new ArrayList<>();
            for (int i = 0; i < newShipmentReq.shipmen_item_list.stream().count(); i++) {
                ItemList.add(new ShipmentItem(temp.getId().toString(), newShipmentReq.shipmen_item_list.get(i)));
            }
            shipmentItemRepository.saveAll(ItemList);
        }
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
        List<ShipmentItem> items = shipmentItemRepository.findAllByShipmentId(temp.get().getId().toString());
        ShipmentWithItems result = new ShipmentWithItems(temp.get(), items);
        return new GetShipmentByIdRes("200", "Found record of Shipment", result);
    }

    public NormalRes updateById(UpdateShipmentReq updateShipmentReq) throws Error{

        Optional<Shipment> temp = shipmentRepository.findById(UUID.fromString(updateShipmentReq.id));
        if (temp.isEmpty()){
            return new NormalRes("404", "No record in DB", "");
        }
        temp.get().setReceiverName(updateShipmentReq.receiver_name);
        temp.get().setContactNumber(updateShipmentReq.contact_number);
        temp.get().setContactAddress(updateShipmentReq.contact_address);
        temp.get().setShipmentStatus(updateShipmentReq.shipment_status);
        temp.get().setCode(updateShipmentReq.code);

        shipmentRepository.save(temp.get());
        return new NormalRes("200", "Updated", "");
    }


    public NormalRes updateShipmentItem(UpdateShipmentItemReq updateShipmentItemReq) throws Error {
        Optional<ShipmentItem> item = shipmentItemRepository.findByShipmentIdAndProductId(updateShipmentItemReq.shipmentId, updateShipmentItemReq.productId);
        if (item.isEmpty()){
            return new NormalRes("404", "Data not found", "");
        }
        item.get().setAmount(updateShipmentItemReq.amount);
        shipmentItemRepository.save(item.get());
        return new NormalRes("200", "Updated item", updateShipmentItemReq.productId + "---" + updateShipmentItemReq.shipmentId);
    }


    public GetListShipment getByOrderId(String orderId) throws Error {
        List<Shipment> temp =  shipmentRepository.findShipmentByOrderId(orderId);
        if (temp.isEmpty()){
            return new GetListShipment("404", "No record in DB", null);
        }
//        List<ShipmentItem> items = shipmentItemRepository.findAllByShipmentId(temp.get().getId().toString());
//        ShipmentWithItems result = new ShipmentWithItems(temp.get(), items);
        return new GetListShipment("200", "Found record of Shipment", temp);
    }

    public NormalRes updateStatus(UpdateShipmentStatusReq updateStatusReq) throws Error{
        Optional<Shipment> item = shipmentRepository.findById(UUID.fromString(updateStatusReq.id));
        if (item.isEmpty()){
            return new  NormalRes("404", "Not found", "");
        }
        item.get().setShipmentStatus(updateStatusReq.shipmentStatus);
        shipmentRepository.save(item.get());
        return new NormalRes("200", "Updated","");
    }

    public String cancel(String id) throws Error {
        List<Shipment> shipment = shipmentRepository.findShipmentByOrderId(id);
        if (shipment.isEmpty()){
            return "not found";
        }
        System.out.println("good here");
        shipment.forEach((x) -> {
            x.setShipmentStatus(ShipmentStatus.CANCEL);
            shipmentRepository.save(x);
        });

        return "ok";
    }
}
