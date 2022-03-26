package com.erp.sale.entity;

import com.erp.sale.controller.request.OrderItemReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID        id;
    private String      orderId;
    private Integer     noNum;
    private String      productCode;
    private String      productName;
    private Integer     amount;
    private String      productId;

    public OrderItem(String orderID, OrderItemReq orderItemReq){
        this.orderId = orderID;
        this.noNum = orderItemReq.noNum;
        this.productCode = orderItemReq.productCode;
        this.productName = orderItemReq.productName;
        this.amount = orderItemReq.amount;
        this.productId = orderItemReq.productId;
    }
}
