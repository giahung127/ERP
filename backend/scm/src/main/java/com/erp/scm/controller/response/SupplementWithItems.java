package com.erp.scm.controller.response;

import com.erp.scm.entity.Supplement;
import com.erp.scm.entity.SupplementItem;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class SupplementWithItems {
    public Supplement supplement;
    public List<SupplementItem> supplementItems;
}
