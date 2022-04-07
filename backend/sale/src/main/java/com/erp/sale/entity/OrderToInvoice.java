package com.erp.sale.entity;

import com.erp.sale.entity.compositeKey.CompositeKeyOrderToInvoice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CompositeKeyOrderToInvoice.class)
public class OrderToInvoice {
    @Id
    private String orderId;
    @Id
    private String invoiceId;
}
