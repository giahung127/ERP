package com.erp.sale.entity;

import com.erp.sale.entity.enumType.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="uuid-char")
    private UUID id;
    private String code;
    private double totalTax;
    private double totalDiscount;
    private double totalPrice;
    private InvoiceStatus invoiceStatus;

    public Invoice(double totalDiscount, double totalTax, double totalPrice){
        this.totalDiscount = totalDiscount;
        this.totalTax = totalTax;
        this.totalPrice = totalPrice;
        this.invoiceStatus = InvoiceStatus.UNPAID;
    }
}
