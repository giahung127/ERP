import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/customer/customer.model';
import { Supplier } from '../../shared/models/supplier/shipment.model';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
  supplierList: Supplier[] = [];
  columnName: string[] = [
    'Code',
    'Name',
    'Phone',
    'Address'
  ];
  columnToProperty = {
    'Code': 'code',
    'Name': 'name',
    'Phone': 'phone',
    'Address': 'address'
  };

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.getSupplierList();
  }

  getSupplierList(){
    this.supplierService.getAllSupplier()
    .subscribe((res) => {
      let temp;
      temp = res;
      this.supplierList = temp.suppliers.map(({id, name, address, phone, email}) => {
        return {
          'supplierId': id,
          'name': name,
          'address': address,
          'phone': phone,
          'email': email,
          'code': ''
        }
      })
    })
  }

  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/supplier-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/supplier-detail'],{
      queryParams: { supplierId: id }
    });
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/scm/supplier-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
