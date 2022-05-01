package com.erp.sale.service;

import com.erp.sale.controller.request.AddProductToPriceListReq;
import com.erp.sale.controller.request.NewPriceListReq;
import com.erp.sale.controller.request.UpdatePriceListItemReq;
import com.erp.sale.controller.request.UpdatePriceListReq;
import com.erp.sale.controller.response.*;
import com.erp.sale.entity.PriceList;
import com.erp.sale.entity.PriceListItem;
import com.erp.sale.repository.PriceListItemRepository;
import com.erp.sale.repository.PriceListRepository;
import com.erp.sale.controller.response.related.PriceListItemWithName;
import com.erp.sale.service.api.ProductService;
import com.erp.sale.service.api.response.ProductNameAndCodeRes;
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


    public List<GetPriceListByIdRes> loadAllPriceList(){
        // Take all priceList out
        List<PriceList> priceLists = priceListRepository.findAll();
        // Merger PriceList + PriceListItemWithName
        List<GetPriceListByIdRes> result = priceLists.parallelStream().map(
            priceList -> getById(priceList.getId().toString())
        ).collect(Collectors.toList());
        return result;
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
        if (priceListItems.isEmpty()){
            if (priceList.isEmpty()){
                return  new GetPriceListByIdRes("404", "Found no Data for price list item", null);
            }
            GetByIdPriceList result = new GetByIdPriceList(priceList.get(), null);
            return new GetPriceListByIdRes("200", "Found Data with no itemList", result);
        }
        List<PriceListItemWithName> itemWithNameList = priceListItems.parallelStream().map(
                priceListItem -> {
                    ProductNameAndCodeRes productNameAndCodeRes = productService.getProductNameById(priceListItem.getProductId());
                    return new PriceListItemWithName(priceListItem, productNameAndCodeRes);
                }
        ).collect(Collectors.toList());
        GetByIdPriceList result = new GetByIdPriceList(priceList.get(), itemWithNameList);
        return new GetPriceListByIdRes("200", "Found Data", result);
    }

    public AddNewProductToPriceListRes addNewProductToPriceList(AddProductToPriceListReq item) throws Error {
        priceListItemRepository.save(new PriceListItem(item));
        return new AddNewProductToPriceListRes("200", "Inserted New Item To PriceList", "" );
    }


    public NormalRes updatePriceListItem(UpdatePriceListItemReq itemReq) throws Error {
        Optional<PriceListItem> temp = priceListItemRepository.findPriceListItemByPriceListIdAndProductId(itemReq.price_list_id, itemReq.product_id);
        if (temp.isEmpty()){
            return new NormalRes("404", "Not found priceListItem", "");
        }
        temp.get().setPrice(itemReq.price);
        priceListItemRepository.save(temp.get());
        return new NormalRes("200", "Updated priceListItem", "");
    }

    public NormalRes updatePriceList(UpdatePriceListReq req) throws Error {
        Optional<PriceList> priceList = priceListRepository.findById(UUID.fromString(req.id));
        if (priceList.isEmpty()){
            return new NormalRes("404", "Not found priceList", "");
        }
        priceList.get().setPriceListCode(req.price_list_code);
        priceList.get().setPriceListName(req.price_list_name);
        priceListRepository.save(priceList.get());
        return new NormalRes("200", "Updated price list", "");
    }
}