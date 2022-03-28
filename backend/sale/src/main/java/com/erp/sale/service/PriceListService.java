package com.erp.sale.service;

import com.erp.sale.controller.request.NewPriceListReq;
import com.erp.sale.controller.response.GetByIdPriceList;
import com.erp.sale.controller.response.GetPriceListByIdRes;
import com.erp.sale.controller.response.NewPriceListRes;
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

    public NewPriceListRes newPriceList(NewPriceListReq newPriceListReq){
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
        return new NewPriceListRes("200", "Inserted new Price List with ID", newPriceList.getId().toString());
    }

    public GetPriceListByIdRes getById(String priceListId) throws Error {
        Optional<PriceList> priceList = priceListRepository.findById(UUID.fromString(priceListId));;
        System.out.println(priceList.get().getId());
        List<PriceListItem> priceListItems = priceListItemRepository.findPriceListItemByPriceListId(priceListId);
        System.out.println(priceListItems.get(0).getPriceListId());
        GetByIdPriceList result = new GetByIdPriceList(priceList, priceListItems);
        if (priceListItems.isEmpty()){
            return  new GetPriceListByIdRes("404", "Found no Data", null);
        }
        return new GetPriceListByIdRes("200", "Found Data", result);
    }
}