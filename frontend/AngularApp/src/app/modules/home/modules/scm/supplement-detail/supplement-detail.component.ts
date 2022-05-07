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
  selectedSupplement
  viewModeCheck = true;
  searchKeyword = '';
  totalPrice = 0;
  tax = 0;
  selectedSupplier = '';
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
  orderProductList: ImportProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private supplementService: SupplementService,
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { 
    this.getListSupplier();
    this.getProductList(); 
  }

  onBack() {
    this._location.back();
  }

  getSelectedSupplement(supplementId: string){
    this.supplementService.getSupplementById(supplementId)
    .subscribe((res)=> {
      let temp;
      temp = res
      this.selectedSupplement = {
        supplementId: supplementId,
        supplementCode: temp.data.supplement.code,
        createdDate: new Date(temp.data.supplement.date).toDateString(),
        createdBy: temp.data.supplement.createdBy,
        supplierId: temp.data.supplement.supplierId,
        supplierName: this.supplierList.find(x => {return x.supplierId === temp.data.supplement.supplierId})?.name,
        total: temp.data.supplement.total
      }
      this.importProductList = temp.data.supplementItems.map(({ noNum, productId, amount, expiryDate, price, manufacturedDate})=>{
        return {
          'no': noNum,
          'productId': productId,
          'productCode': this.productList.find(x => {return x.productId === productId})?.productCode,
          'productName': this.productList.find(x => {return x.productId === productId})?.productName,
          'amount': amount,
          'price': price,
          'isExpire':this.productList.find(x => {return x.productId === productId})?.isExpire,
          'expiryDate':new Date(expiryDate).toDateString(),
          'manufacturedDate': new Date(manufacturedDate).toDateString(),
        }
      })
      this.reIndexNo();
    })
  }

  getProductList() {
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name, price, categoryName, description, is_expire})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryName': categoryName,
            'price': price,
            'description': description,
            'isExpire': is_expire
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
      this.route.queryParams.subscribe((params) => {  
        if (params['supplementId']) {
          this.viewModeCheck = false;
          this.getSelectedSupplement(params['supplementId']);
        } else {
          this.viewModeCheck = true;
          this.selectedSupplement = {
            supplementId: "",
            supplementCode: "",
            createdDate: "",
            createdBy: "Gia Hung",
            supplierId: "",
            supplierName: "",
            total: 0
          } 
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
      if(<boolean>product.isExpire){
        const newData = new ImportProduct(this.importProductList.length +1, product.productId, product.productCode, product.productName, 1, 0, <boolean>product.isExpire)
        newData.expiryDate = new Date();
        newData.manufacturedDate = new Date();
        this.importProductList.push(newData)
      } else {
        this.importProductList.push(new ImportProduct(this.importProductList.length +1, product.productId, product.productCode, product.productName, 1, 0, <boolean>product.isExpire))
      }
    }
    this.reCalculateTotal();
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
            const data = {
              supplier_id: this.selectedSupplier,
              created_by: "Gia Hung",
              date: new Date(),
              total: this.totalPrice,
              code:'',
              supplement_item_list: this.importProductList.map(x => {
                return {
                  product_id: x.productId,
                  price: x.price,
                  amount: x.amount,
                  manufactured_date: x.manufacturedDate,
                  expiry_date: x.expiryDate
                }
              }),
            }
            this.supplementService.addNewSupplement(data)
              .subscribe((res) => {
                this.toastr.success('New import is successfully created');
                this.onBack();
              })
          }
      });
  }
}
