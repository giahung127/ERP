package com.erp.scm.controller.request;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

public class NewSupplementReq {
    public String supplier_id;
    public String created_by;
    public Date   date;
    public float  total;
    public List<SupplementItemReq> supplement_item_list;
}
