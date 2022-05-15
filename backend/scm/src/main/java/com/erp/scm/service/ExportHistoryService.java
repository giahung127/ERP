package com.erp.scm.service;

import com.erp.scm.entity.ExportHistory;
import com.erp.scm.entity.Product;
import com.erp.scm.entity.SupplementItem;
import com.erp.scm.repository.ExportHistoryRepository;
import com.erp.scm.repository.ProductRepository;
import com.erp.scm.repository.SupplementItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExportHistoryService {
    @Autowired
    private ExportHistoryRepository exportHistoryRepository;
    @Autowired
    private SupplementItemRepository supplementItemRepository;
    @Autowired
    private ProductRepository productRepository;

    public void updateAfterCancelOrder(String orderId) throws Error {
        List<ExportHistory> exportHistoryList = exportHistoryRepository.findAllByOrderId(orderId);
        System.out.println(orderId);
        exportHistoryList.forEach(
            exportHistory ->{
                Optional<SupplementItem> supplementItem =  supplementItemRepository.findSupplementItemByProductIdAndSupplementId(
                        exportHistory.getProductId(),
                        exportHistory.getSupplementId()
                );
                supplementItem.get().setRemaining(supplementItem.get().getRemaining() + exportHistory.getAmount());
                supplementItemRepository.save(supplementItem.get());
                Optional<Product> product = productRepository.findById(UUID.fromString(exportHistory.getProductId()));
                product.get().setAmount(product.get().getAmount() + exportHistory.getAmount());
                productRepository.save(product.get());
            }
        );
    }
}
