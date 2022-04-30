package com.erp.scm.service;

import com.erp.scm.controller.request.NewSupplierReq;
import com.erp.scm.controller.request.UpdateSupplierReq;
import com.erp.scm.controller.response.GetSupplierByIdRes;
import com.erp.scm.controller.response.NormalRes;
import com.erp.scm.controller.response.SuppliersRes;
import com.erp.scm.entity.Supplier;
import com.erp.scm.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public NormalRes newSupplier(NewSupplierReq supplierReq) throws Error {
        Supplier temp = supplierRepository.save(new Supplier(supplierReq));
        return new NormalRes("200", "New supplier has been created", temp.getId().toString());
    }

    public GetSupplierByIdRes getSupplierById(String id) throws Error {
        Optional<Supplier> result = supplierRepository.findById(UUID.fromString(id));
        assert(result.isEmpty());
        return new GetSupplierByIdRes("200", "Found Supplier Record", result.get());
    }


    public NormalRes update(UpdateSupplierReq updateSupplierReq) throws Error {
        Optional<Supplier> temp = supplierRepository.findById(UUID.fromString(updateSupplierReq.id));
        if (temp.isEmpty()){
            return new NormalRes("403","No record of given supplier information found", "");
        }
        Supplier curItem = temp.get();
        curItem.setName(updateSupplierReq.name);
        curItem.setAddress(updateSupplierReq.address);
        curItem.setPhone(updateSupplierReq.phone);
        curItem.setEmail(updateSupplierReq.email);
        curItem.setCode(updateSupplierReq.code);
        supplierRepository.save(curItem);
        return new NormalRes("200", "Updated supplier information", "");
    }

    public NormalRes delete(String id) throws Error {
        supplierRepository.deleteById(UUID.fromString(id));
        return new NormalRes("200", "Deleted Supplier: " + id, "");
    }

    public SuppliersRes getAll() throws Error{
        List<Supplier> result = supplierRepository.findAll();
        return new SuppliersRes("200", "Found all Suppliers", result);
    }
}
