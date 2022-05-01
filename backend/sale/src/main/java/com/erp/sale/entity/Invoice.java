package com.erp.sale.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
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
    private double totalTax;
    private double totalDiscount;
    private double totalPrice;

    // single order to invoice
    public Invoice(double totalDiscount, double totalTax, double totalPrice){
        this.totalDiscount = totalDiscount;
        this.totalTax = totalTax;
        this.totalPrice = totalPrice;
    }

    // multiple order to invoice
    public Invoice(List<Order> orders, float totalPrice){
        this.totalTax = orders.parallelStream().mapToDouble(i -> i.getTotalIncludeTax()).sum() + orders.parallelStream().mapToDouble(i -> i.getTotalExcludeTax()).sum() ;
        this.totalDiscount = orders.parallelStream().mapToDouble(i -> i.getDiscount()).sum();
        this.totalPrice = totalPrice;
    }
}
