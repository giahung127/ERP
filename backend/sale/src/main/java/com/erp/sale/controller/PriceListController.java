package com.erp.sale.controller;

import com.erp.sale.controller.request.AddProductToPriceListReq;
import com.erp.sale.controller.request.NewPriceListReq;
import com.erp.sale.controller.request.UpdatePriceListItemReq;
import com.erp.sale.controller.response.AddNewProductToPriceListRes;
import com.erp.sale.controller.response.GetByIdPriceList;
import com.erp.sale.controller.response.GetPriceListByIdRes;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.entity.PriceList;
import com.erp.sale.service.PriceListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/sale/price_list")
public class PriceListController {
    @Autowired
    private PriceListService priceListService;

    @GetMapping("/loadAll")
    public List<GetPriceListByIdRes> getAllPriceList(){
        return priceListService.loadAllPriceList();
    }

    @PostMapping("/addNew")
    public NormalRes newPriceList(@RequestBody NewPriceListReq newPriceListReq){
        return priceListService.newPriceList(newPriceListReq);
    }

    @GetMapping("/getById/{priceListId}")
    public GetPriceListByIdRes getById(@PathVariable String priceListId){
        return priceListService.getById(priceListId);
    }

    @PostMapping("newProduct")
    public AddNewProductToPriceListRes addNewProductToPriceList(@RequestBody AddProductToPriceListReq item){
        return priceListService.addNewProductToPriceList(item);
    }

    @PostMapping("updatePriceListItem")
    public NormalRes updatePriceListItem(@RequestBody UpdatePriceListItemReq itemReq){
        return priceListService.updatePriceListItem(itemReq);
    }
}

