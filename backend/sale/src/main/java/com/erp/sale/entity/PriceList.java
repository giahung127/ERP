package com.erp.sale.entity;

import com.erp.sale.controller.request.NewPriceListReq;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`price_list`")
public class PriceList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID             id;
    private  String          priceListName;
    private  String          priceListCode;

    public PriceList(NewPriceListReq newPriceListReq) {
        this.id = newPriceListReq.id;
        this.priceListCode = newPriceListReq.priceListCode;
        this.priceListName = newPriceListReq.priceListName;
    }
}
