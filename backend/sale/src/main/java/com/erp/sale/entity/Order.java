package com.erp.sale.entity;

import com.erp.sale.controller.request.NewOrderReq;
import com.erp.sale.controller.OrderStatus;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID             id;
    private  String          creatorName;
    private  String          priceListId;
    private  Float           totalIncludeTax;
    private  Float           totalExcludeTax;
    private  Float           tax;
    private  Float           discount;
    private  Float           shippingFee;
    private  String          address;
    private  OrderStatus     orderStatus;
    private  Date            createDate;
    private  String          customerId;
    private  String          customerName;

    public Order(NewOrderReq newOrderReq) {
        this.creatorName = newOrderReq.creator_name;
        this.priceListId = newOrderReq.price_list_id;
        this.totalIncludeTax = newOrderReq.total_include_tax;
        this.totalExcludeTax = newOrderReq.total_exclude_tax;
        this.tax = newOrderReq.tax;
        this.discount = newOrderReq.discount;
        this.shippingFee = newOrderReq.shipping_fee;
        this.address = newOrderReq.address;
        this.orderStatus = OrderStatus.WAITING;
        this.createDate = newOrderReq.create_date;
        this.customerId = newOrderReq.customer_id;
        this.customerName = newOrderReq.customer_name;
    }
}
