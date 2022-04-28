import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/models/product/product.model';
import { ProductService } from '../services/product.service';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  productList: Product[] = [];
  
  showProductList: Product[] = [];
  columnName: string[] = [
    'ProductCode',
    'Name',
    'Price',
    'Category',
    'Description'
  ];
  columnToProperty = {
    'ProductCode': 'productCode',
    'Name': 'productName',
    'Price': 'price',
    'Category': 'categoryName',
    'Description': 'description'
  };

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name,price, categoryName, description, category_id})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryId': category_id,
            'categoryName': categoryName,
            'price': price,
            'description': description
          }
        })
        this.showProductList = this.productList;
      })
  }
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/product-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/product-detail'], {
      queryParams: { productId: id }
    });
    
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/scm/product-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
  childrenChangedHandler(data) {
    if(data.id !== ''){
      this.showProductList = this.productList.filter(x => {return x.categoryId === data.id});
    } else {
      this.showProductList = this.productList
    }
  }
  

  uploadExcelFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    };
    const dialogRef = this.dialog.open(UploadFileDialogComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe()
  }
}
