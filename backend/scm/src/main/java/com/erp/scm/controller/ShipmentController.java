package com.erp.scm.controller;

import com.erp.scm.controller.request.NewShipmentReq;
import com.erp.scm.controller.request.UpdateShipmentItemReq;
import com.erp.scm.controller.request.UpdateShipmentReq;
import com.erp.scm.controller.response.GetShipmentByIdRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.entity.Shipment;
import com.erp.scm.service.ShipmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/scm/shipment")
public class ShipmentController {
    @Autowired
    private ShipmentService shipmentService;

    @PostMapping("newShipment")
    public NormalRes newShipment (@RequestBody NewShipmentReq newShipmentReq){
        return shipmentService.newShipment(newShipmentReq);
    }

    @GetMapping("loadAll")
    public List<Shipment> loadAll(){
        return shipmentService.loadAll();
    }

    @GetMapping("getById/{id}")
    public GetShipmentByIdRes getByID(@PathVariable String id){
        return shipmentService.getById(id);
    }

    @PostMapping("updateById")
    public NormalRes UpdateById(@RequestBody UpdateShipmentReq updateShipmentReq) {
        return shipmentService.updateById(updateShipmentReq);
    }

    @PostMapping("updateShipmentItem")
    public NormalRes updateShipmentItem(@RequestBody UpdateShipmentItemReq updateShipmentItemReq){
        return shipmentService.updateShipmentItem(updateShipmentItemReq);
    }

    @GetMapping("getByOrderId/{orderId}")
    public GetShipmentByIdRes getByOrderId(@PathVariable String orderId){
        return shipmentService.getByOrderId(orderId);
    }

}
