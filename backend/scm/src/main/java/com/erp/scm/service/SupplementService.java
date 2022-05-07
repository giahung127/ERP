package com.erp.scm.service;

import com.erp.scm.controller.request.NewSupplementReq;
import com.erp.scm.controller.request.SupplementItemReq;
import com.erp.scm.controller.response.GetListSupplementRes;
import com.erp.scm.controller.response.GetSupplementRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.controller.response.SupplementWithItems;
import com.erp.scm.entity.Product;
import com.erp.scm.entity.Supplement;
import com.erp.scm.entity.SupplementItem;
import com.erp.scm.entity.Supplier;
import com.erp.scm.repository.ProductRepository;
import com.erp.scm.repository.SupplementItemRepository;
import com.erp.scm.repository.SupplementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SupplementService {
    @Autowired
    private SupplementRepository supplementRepository;
    @Autowired
    private SupplementItemRepository supplementItemRepository;
    @Autowired
    private ProductRepository productRepository;

    public NormalRes newSupplement(NewSupplementReq newSupplementReq) throws Error {
        if (newSupplementReq == null){
            return  new NormalRes("404", "Null data", "");
        }
        List<Supplement> supplementList = supplementRepository.findAll();
        String sequencePart = ("000000" + (supplementList.size() + 1));
        newSupplementReq.code = "SLM" + sequencePart.substring(sequencePart.length() - 6);
        Supplement newSupplement = supplementRepository.save(new Supplement(newSupplementReq));
        List<SupplementItem> items = new ArrayList<>();
        List<SupplementItemReq> itemListReq = newSupplementReq.supplement_item_list;
        for (SupplementItemReq supplementItemReq : itemListReq) {
            items.add(new SupplementItem(supplementItemReq, newSupplement.getId().toString()));
            Optional<Product> tempProduct = productRepository.findById(UUID.fromString(supplementItemReq.product_id));
            if (tempProduct.isEmpty()){
                return new NormalRes("404", "Mismatch product information", supplementItemReq.product_id);
            }
            tempProduct.get().setAmount(tempProduct.get().getAmount() + supplementItemReq.amount);
            productRepository.save(tempProduct.get());
        }
        supplementItemRepository.saveAll(items);
        return new NormalRes("200", "Inserted new supplement", newSupplement.getId().toString());
    }

    public GetListSupplementRes loadAllSupplement() throws Error {
        List<Supplement> supplements = supplementRepository.findAll();
        if (supplements.isEmpty()){
            return new GetListSupplementRes("404", "Not Found", null);
        }

        List<SupplementWithItems> result = supplements.parallelStream().map(
                supplement -> {
                    Supplement temp = supplementRepository.findById(supplement.getId()).get();
                    List<SupplementItem> items = supplementItemRepository.findAllBySupplementId(String.valueOf(supplement.getId()));
                    return new SupplementWithItems(temp, items);
                }
        ).collect(Collectors.toList());
        return new GetListSupplementRes("200", "Get All Supplement", result);
    }

    public GetSupplementRes getSupplementById(String id) throws Error {
        Optional<Supplement> result =  supplementRepository.findById(UUID.fromString(id));
        if (result.isEmpty()){
            return new GetSupplementRes("404", "Not Found", null);
        }
        List<SupplementItem> supplementItems = supplementItemRepository.findAllBySupplementId(result.get().getId().toString());
        return new GetSupplementRes("200", "Get Order By ID", new SupplementWithItems(result.get(), supplementItems) );
    }
}