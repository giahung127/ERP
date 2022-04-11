import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../scm/services/product.service';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { AddPriceListModalComponent } from '../add-price-list-modal/add-price-list-modal.component';
import { AddProductToPriceListModalComponent } from '../add-product-to-price-list-modal/add-product-to-price-list-modal.component';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  priceListList: PriceList[] = [];
  constructor(
    private priceListService: PriceListService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getAllPriceList();
    this.getProductList();
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
        console.log(this.priceListList)
        this.productPriceList = this.priceListList[0].item
        this.currentPriceListId = this.priceListList[0].id
        // this.priceListService.getPriceListById(this.priceListList[0].id)
        // .subscribe((res) => {
        //   let temp;
        //   temp = res
        //   if(temp.data !== null){
        //     this.priceListList[0].item = temp.data.price_list_items
        //     this.productPriceList = temp.data.price_list_items
        //   }
        //   else {
        //     this.priceListList[0].item = []
        //     this.productPriceList = []
        //   }
        //   this.currentPriceListId = this.priceListList[0].id
        // })
      })
  }
  productPriceList;
  productList;
  columnName: string[] = [
    'Code',
    'Product',
    'Price'
  ];
  columnToProperty = {
    'Code': 'productCode',
    'Product': 'productName',
    'Price': 'price'
  };
  formFieldList = {
    'Price': 'price'
  };
  currentPriceListId: string = '';
  openCreatePriceListDialog(selectedPriceListId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      priceListList: this.priceListList,
      selectedPriceListId: selectedPriceListId
    };
    const dialogRef = this.dialog.open(AddPriceListModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(
          (newPriceList) => {
            if(newPriceList){
              const data = {
                price_list_name: newPriceList.priceListName,
                price_list_code: newPriceList.priceListCode,
                price_list_items: []
              }
              if(selectedPriceListId === ''){
                  this.priceListService.addNewPriceList(data)
                  .subscribe(
                    (res)=>{
                      let temp;
                      temp = res
                      this.priceListList.push(new PriceList(temp.data ,data.price_list_code, data.price_list_name))
                      this.toastr.success('New price list is successfully added');
                    },
                    (err) => {
                      this.toastr.error(err)
                    }
                  )
                } else {
                  this.toastr.success('The price list is successfully updated');
                }
              }
        });
    }
  
  getProductList(){
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name,price, category, description, category_id})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryId': category_id,
            'categoryName': category,
            'price': price,
            'description': description
          }
        })
      })
  }
  onAddEmployee: () => void = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentPriceListId :this.currentPriceListId,
      priceListList: this.priceListList,
      productList: this.productList
    };
    const dialogRef = this.dialog.open(AddProductToPriceListModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(
          (newPriceList) => {
            if(newPriceList){
              this.priceListService.addProductToPriceList(newPriceList)
              .subscribe(res => {
                console.log(res)
                this.priceListService.getPriceListById(newPriceList.priceListId)
                  .subscribe((res) => {
                    let temp;
                    temp = res
                    if(temp.data !== null){
                      this.priceListList.filter(x=> {return x.id === newPriceList.priceListId})[0].item = temp.data.price_list_items
                      this.productPriceList = temp.data.price_list_items
                    }
                    else {
                      this.priceListList.filter(x=> {return x.id === newPriceList.priceListId})[0].item = []
                      this.productPriceList = []
                    }
                  })
                this.toastr.success('Successfully added');
              },
              (err) => {
                this.toastr.error(err);
              })
              }
        });
  };

  getProductPriceList(id: string){
    this.currentPriceListId = id;
    if(this.priceListList.filter(x=> {return x.id === id})[0].item === undefined){
      this.priceListService.getPriceListById(id)
          .subscribe((res) => {
            let temp;
            temp = res
            if(temp.data !== null){
              this.priceListList.filter(x=> {return x.id === id})[0].item = temp.data.price_list_items
              this.productPriceList = temp.data.price_list_items
            }
            else {
              this.priceListList.filter(x=> {return x.id === id})[0].item = []
              this.productPriceList = []
            }
          })
    } else {
      this.productPriceList = this.priceListList.filter((x) => {return x.id === id})[0].item;
    }
  }

  onSave(){
    
  }
}
