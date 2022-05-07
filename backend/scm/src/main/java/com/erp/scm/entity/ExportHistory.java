package com.erp.scm.entity;

import com.erp.scm.entity.CompositeKey.CompositeKeySupplementItem;
import com.erp.scm.entity.CompositeKey.ExportCompositeKey;
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
@IdClass(ExportCompositeKey.class)
public class ExportHistory {
    @Id
    private String productId;
    @Id
    private String supplementId;
    @Id
    private String orderId;
    private  int amount;
}
