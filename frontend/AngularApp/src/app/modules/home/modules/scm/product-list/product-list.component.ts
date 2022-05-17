import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../sales/service/order.service';
import { PriceListService } from '../../sales/service/price-list.service';
import { PriceList } from '../../shared/models/price-list/price-list.model';
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
    private toastr: ToastrService,
    private orderService: OrderService,
    private priceListService: PriceListService
  ) {}
  priceListList: PriceList[] = [];
  productList: Product[] = [];
  needItemList: {productId: string, amount: number}[] = [];
  showProductList: Product[] = [];
  columnName: string[] = [
    'ProductCode',
    'Name',
    'Price',
    'Amount',
    'Need amount',
    'Category',
    'Description'
  ];
  columnToProperty = {
    'ProductCode': 'productCode',
    'Name': 'productName',
    'Price': 'price',
    'Amount': 'amount',
    'Need amount':'needAmount',
    'Category': 'categoryName',
    'Description': 'description'
  };

  ngOnInit(): void {
    this.getWaitingOrder()
    this.getAllPriceList()
  }

  initData(){
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name,price, categoryName, description, category_id, amount})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryId': category_id,
            'categoryName': categoryName,
            'price': price,
            'description': description,
            'amount': amount,
            'needAmount': this.needItemList.find(x => {return x.productId === id})? this.needItemList.find(x => {return x.productId === id})?.amount : 0
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
      state: {isExprie: this.productList.find(x => {return x.productId === id})?.isExpire},
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
  getAllPriceList(){
    this.priceListService.getAllPriceList()
      .subscribe((res)=> {
        let data;
        data = res;
        data = data.map(x => {return x.data});
        this.priceListList = data.map(({ price_list_id, price_list_code, price_list_name, price_list_items})=>{
          return {
            'id': price_list_id,
            'code': price_list_code,
            'name': price_list_name,
            'item': price_list_items !== null ? price_list_items: []
          }
        })
      })
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
      .subscribe((res) => {
        const data = {
          'list_new_products': res
        }
        this.productService.addNewListProduct(data)
        .subscribe((listNewId) => {
          let temp;
          temp = listNewId
          const data = {
            'price_list_id': this.priceListList.find(x => {return x.name === 'Default'})?.id,
            'price_list_item_list': temp.data
          }
          console.log(data)
          this.priceListService.updatePriceListItem(data)
          .subscribe((res) => {
            this.toastr.success('All changes are saved ')
          })
        })
      })
  }

  getWaitingOrder(){
    this.orderService.getOrderByStatus('WAITING')
    .subscribe((res) => {
      let temp;
      temp = res
      if (temp.data != null)
      {
        temp.data = temp.data.map((x) => {
          return x.orderItems
        })
        temp.data = [].concat(...temp.data)
        temp.data.forEach((x) => {
          if (this.needItemList.find(item => {
            return item.productId === x.productId
          })) {
            this.needItemList.filter(item => {
              return item.productId === x.productId
            })[0].amount += x.amount;
          } else {
            this.needItemList.push({productId: x.productId, amount: x.amount})
          }
        })
        this.productService.setLocalNeedItem(this.needItemList);
      }
      this.initData()
    })

  }
}
