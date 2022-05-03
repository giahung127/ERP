package com.erp.sale.service.api;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.response.NormalRes;
import com.erp.sale.service.api.request.UpdateAfterOrderReq;
import com.erp.sale.service.api.response.ProductNameAndCodeRes;
import lombok.SneakyThrows;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ProductService {
    private final WebClient.Builder webClientBuilder;

    public ProductService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public ProductNameAndCodeRes getProductNameById(String productId){
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:10003/scm/product/getProductNameAndCode/" + productId)
                .retrieve()
                .bodyToMono(ProductNameAndCodeRes.class)
                .block();
    }

    @SneakyThrows
    public NormalRes updateAfterOrder(UpdateAfterOrderReq updateAfterOrderReq){
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:10003/scm/product/updateAfterOrder");

        String json = "{" + "\"type\": \"" + updateAfterOrderReq.type  + "\"," + "\"amount\": \"" + updateAfterOrderReq.amount + "\","  + "\"product_id\": \"" + updateAfterOrderReq.product_id + "\""  + "}";
        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assert (response.getStatusLine().getStatusCode() == 200);
        client.close();
        return new NormalRes("200", "Updated product information", "");
    }
}