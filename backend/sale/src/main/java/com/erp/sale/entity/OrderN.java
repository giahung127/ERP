package com.erp.sale.entity;

import com.erp.sale.controller.NewOrderReq;
import com.erp.sale.controller.OrderStatus;
import com.erp.sale.controller.OderItem;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderN {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long    id;
    private String        creatorName;
    private String        customerName;
    private Date          date;
    @Transient
    private List<OderItem> oderItemList;
    private OrderStatus orderStatus;

    public OrderN(NewOrderReq newOrderReq){
        this.creatorName = newOrderReq.creatorName;
        this.customerName = newOrderReq.customerName;
        this.date = newOrderReq.date;
        this.oderItemList = newOrderReq.oderItemList;
        this.orderStatus = OrderStatus.WAITING_CONFIRM;
    }
}
