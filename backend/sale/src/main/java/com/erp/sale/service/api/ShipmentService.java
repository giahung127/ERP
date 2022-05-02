package com.erp.sale.service.api;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class ShipmentService {
    private final WebClient.Builder webClientBuilder;

    public ShipmentService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public String cancelShipmentByOrderId(String orderId){
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:10003/scm/shipment/cancel/" + orderId)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}