import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Import } from '../../shared/models/import/import.model';
import { Product } from '../../shared/models/product/product.model';
import { Supplier } from '../../shared/models/supplier/shipment.model';
import { SupplementService } from '../services/supplement.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplement-list',
  templateUrl: './supplement-list.component.html',
  styleUrls: ['./supplement-list.component.scss']
})
export class SupplementListComponent {
  supplementList: Import[] = []
  supplierList: Supplier[] = []
  constructor(
    private router: Router,
    private supplementService: SupplementService,
    private supplierService: SupplierService
  ) {
    this.getListSupplier()
  }
  productList: Product[] = [];
  columnName: string[] = [
    'Code',
    'Date',
    'Supplier',
  ];
  columnToProperty = {
    'Code': 'importCode',
    'Date': 'createdDate',
    'Supplier': 'supplierName'
  };


  getListSupplier(){
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
      this.getAllSupplement()
    })
  }

  getAllSupplement(){
    this.supplementService.getAllSupplement()
    .subscribe((res) => {
      let temp;
      temp = res
      temp.data = temp.data.map(x => {return x.supplement})
      
      this.supplementList = temp.data.map(({id, code, createdBy, date, supplierId, total}) => {
        return {
          importId: id,
          importCode: code,
          createdBy: createdBy,
          createdDate: new Date(date).toDateString(),
          supplierId: supplierId,
          supplierName: this.supplierList.find(x => {return x.supplierId === supplierId})?.name,
          total: total
        }
      })
    })
  }
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/supplement-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    console.log(id)
    this.router.navigate(['/home/scm/supplement-detail'],
    {
      queryParams: { supplementId: id }
    });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
