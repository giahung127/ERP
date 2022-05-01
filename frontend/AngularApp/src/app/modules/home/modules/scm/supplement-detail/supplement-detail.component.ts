import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { Supplier } from '../../shared/models/supplier/shipment.model';
import { ProductService } from '../services/product.service';
import { SupplementService } from '../services/supplement.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplement-detail',
  templateUrl: './supplement-detail.component.html',
  styleUrls: ['./supplement-detail.component.scss']
})
export class SupplementDetailComponent {

  viewModeCheck = true;
  searchKeyword = '';
  totalPrice = 0;
  tax = 0;
  productList: Product[] = [];
  supplierList: Supplier[] = [];
  showProductList: Product[] = [];
  columnName: string[] = [
    'Code',
    'Name',
    'Category',
  ];
  columnToProperty = {
    'Code': 'productCode',
    'Name': 'productName',
    'Category': 'categoryName',
  };
  importProductList: ImportProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private supplementService: SupplementService,
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { 
    this.getProductList();
    this.getListSupplier();
    this.route.queryParams.subscribe((params) => {
      if (params['id'] && params['id'] == 'i001') {
        this.viewModeCheck = false;
      } else {
        this.viewModeCheck = true;
      }     
    })
  }

  onBack() {
    this._location.back();
  }

  getProductList() {
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name, price, category, description})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryName': category,
            'price': price,
            'description': description
          }
        })
        this.showProductList = this.productList;
      })
  }

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
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue.toLowerCase();
    const filter = nonAccentVietnamese(filterValue || '');
    this.showProductList = this.productList.filter((x) => {
        return nonAccentVietnamese(x.productName.toLowerCase() || '').indexOf(filter) !== -1;
    });
  }

  addToImport: (id: string) => void = (id: string) =>{
    const data = this.importProductList.filter(x => {return x.productId === id})[0]
    if(data){
      data.amount += 1;
    } else {
      const product = this.productList.filter(x => {return x.productId === id})[0]
      this.importProductList.push(new ImportProduct(this.importProductList.length +1, product.productId, product.productCode, product.productName, 1, 0))
    }
    this.reCalculateTotal();
    console.log(this.totalPrice)
  }

  reIndexNo() {
      for (let i = 0; i < this.importProductList.length; i++) {
          this.importProductList[i].no = i + 1;
      }
  }

  reCalculateTotal(){
    this.totalPrice = 0;
    this.importProductList.forEach((x)=> {
      this.totalPrice += x.amount*x.price;
    })
  }

  delete(item) {
    this.importProductList = this.importProductList.filter((product) => {
        return product.productId !== item;
    });
    this.reIndexNo();
  }

  onSave(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Crate a new import with these information",
      title: "Create a new import"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((submit) => {
          if (submit) {
            this.toastr.success('New import is successfully created');
            this.onBack();
          }
      });
  }
}
