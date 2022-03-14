package com.erp.sale.controller;

import java.sql.Date;
import java.util.List;

public class NewOrderReq {
    public String           creatorName;
    public Date             date;
    public String           customerName;
    public List<OderItem> oderItemList;
}

//{
//        "creatorName": "NMT",
//        "Date": "2022-03-29",
//        "customerName": "superIdol",
//        "productList": [
//        {
//        "noNum": 1,
//        "productCode": "asdjh897",
//        "productName": "Skincare",
//        "amount": 100
//        },
//        {
//        "noNum": 2,
//        "productCode": "ckjvhkjdhf333",
//        "productName": "Skincare2",
//        "amount": 10
//        }
//        ]
//        }