package com.erp.sale.service;

import com.erp.sale.controller.request.AddProductToPriceListReq;
import com.erp.sale.controller.request.NewPriceListReq;
import com.erp.sale.controller.response.*;
import com.erp.sale.entity.PriceList;
import com.erp.sale.entity.PriceListItem;
import com.erp.sale.repository.PriceListItemRepository;
import com.erp.sale.repository.PriceListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PriceListService {
    @Autowired
    private PriceListRepository priceListRepository;
    @Autowired
    private PriceListItemRepository priceListItemRepository;

    public List<PriceList> loadAllPriceList(){
        return (List<PriceList>) priceListRepository.findAll();
    }

    public NormalRes newPriceList(NewPriceListReq newPriceListReq){
        PriceList newPriceList;
        try {
            newPriceList = priceListRepository.save(new PriceList(newPriceListReq));
            List<PriceListItem> ItemList = new ArrayList<>();
            String priceListId = newPriceList.getId().toString();
            System.out.println(priceListId);
            for (int i = 0; i < newPriceListReq.price_list_items.stream().count(); i++) {
                ItemList.add(new PriceListItem(priceListId,newPriceListReq.price_list_items.get(i)));
            }
            priceListItemRepository.saveAll(ItemList);
        }catch (Error e){
            throw e;
        }
        return new NormalRes("200", "Inserted new Price List with ID", newPriceList.getId().toString());
    }

    public GetPriceListByIdRes getById(String priceListId) throws Error {
        Optional<PriceList> priceList = priceListRepository.findById(UUID.fromString(priceListId));;
        List<PriceListItem> priceListItems = priceListItemRepository.findPriceListItemByPriceListId(priceListId);
        GetByIdPriceList result = new GetByIdPriceList(priceList, priceListItems);
        if (priceListItems.isEmpty()){
            return  new GetPriceListByIdRes("404", "Found no Data", null);
        }
        return new GetPriceListByIdRes("200", "Found Data", result);
    }

    public AddNewProductToPriceListRes addNewProductToPriceList(AddProductToPriceListReq item) throws Error {
        priceListItemRepository.save(new PriceListItem(item));
        return new AddNewProductToPriceListRes("200", "Inserted New Item To PriceList", "" );
    }
}