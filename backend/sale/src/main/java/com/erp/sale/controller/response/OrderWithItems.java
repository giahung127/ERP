package com.erp.sale.controller.response;

import com.erp.sale.entity.Order;
import com.erp.sale.entity.OrderItem;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class OrderWithItems {
    public Order order;
    public List<OrderItem> orderItems;
}
