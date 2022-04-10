package com.erp.sale.service.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class ProductService {
    @Autowired
    private WebClient.Builder webClientBuilder;

    public String getProductNameById(String productId){
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:10003/scm/product/getProductName/" + productId)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
