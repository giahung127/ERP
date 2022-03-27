package com.erp.sale.service;

import com.erp.sale.entity.PriceList;
import com.erp.sale.repository.PriceListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceListService {
    @Autowired
    private PriceListRepository priceListRepository;

    public List<PriceList> loadAllPriceList(){
        return (List<PriceList>) priceListRepository.findAll();
    }
}
