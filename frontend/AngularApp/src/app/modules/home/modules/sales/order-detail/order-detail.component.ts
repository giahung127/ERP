import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ProductService } from '../../scm/services/product.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  viewModeCheck = true;
  searchKeyword = '';
  productList: Product[] = [
  ];
  totalPrice = 0;
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
    private orderService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { 
    this.showProductList = this.productList;
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.viewModeCheck = false;
      } else {
        this.viewModeCheck = true;
      }
      this.getProductList();     
    })
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

  onBack() {
    this._location.back();
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
      this.importProductList.push(new ImportProduct(this.importProductList.length +1, product.productId, product.productCode, product.productName, 1, 10000))
    }
    this.reCalculateTotal();
  }

  reCalculateTotal(){
    this.totalPrice = 0;
    this.importProductList.forEach((x)=> {
      this.totalPrice += x.amount*x.price;
    })
      console.log(this.importProductList)
  }
  reIndexNo() {
      for (let i = 0; i < this.importProductList.length; i++) {
          this.importProductList[i].no = i + 1;
      }
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
      message: "Crate a new order with these information",
      title: "Create a new order"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
            .afterClosed()
            .subscribe((submit) => {
                if (submit) {
                  const data = {
                    creator_name: "giahung",
                    price_list_id: '',
                    total_include_tax: this.totalPrice,
                    total_exclude_tax: this.totalPrice,
                    tax: 0,
                    discount: 0,
                    shipping_fee: 0,
                    address: 'abc',
                    create_date: '',
                    customer_id: '',
                    customer_name: '',
                    product_item_list: this.importProductList,
                  }
                  this.orderService.createNewOrder(data)
                    .subscribe((res) => {
                      this.toastr.success('New order is successfully created');
                      console.log(res);
                      this.onBack()
                    })
                }
            });
  }
}
