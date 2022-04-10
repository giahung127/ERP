package com.erp.sale.service;

import com.erp.sale.controller.request.AddProductToPriceListReq;
import com.erp.sale.controller.request.NewPriceListReq;
import com.erp.sale.controller.response.*;
import com.erp.sale.entity.PriceList;
import com.erp.sale.entity.PriceListItem;
import com.erp.sale.repository.PriceListItemRepository;
import com.erp.sale.repository.PriceListRepository;
import com.erp.sale.controller.response.related.PriceListItemWithName;
import com.erp.sale.service.api.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PriceListService {
    @Autowired
    private PriceListRepository priceListRepository;
    @Autowired
    private PriceListItemRepository priceListItemRepository;
    @Autowired
    private ProductService productService;


//    public List<GetByIdPriceList> loadAllPriceList(){
//        // Take all priceList out
//        List<PriceList> priceLists = priceListRepository.findAll();
//        // Merger PriceList + PriceListItemWithName
//        List<PriceListItemWithName> result = priceLists.parallelStream().map(
//            priceList -> {
//
//            }
//        )
//    }

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
        if (priceListItems.isEmpty()){
            return  new GetPriceListByIdRes("404", "Found no Data for price list item", null);
        }
        List<PriceListItemWithName> itemWithNameList = priceListItems.parallelStream().map(
                priceListItem -> {
                    String productName = String.valueOf(productService.getProductNameById(priceListItem.getProductId()));
                    return new PriceListItemWithName(priceListItem, productName);
                }
        ).collect(Collectors.toList());
        GetByIdPriceList result = new GetByIdPriceList(priceList.get(), itemWithNameList);
        return new GetPriceListByIdRes("200", "Found Data", result);
    }

    public AddNewProductToPriceListRes addNewProductToPriceList(AddProductToPriceListReq item) throws Error {
        priceListItemRepository.save(new PriceListItem(item));
        return new AddNewProductToPriceListRes("200", "Inserted New Item To PriceList", "" );
    }
}