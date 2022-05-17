import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../scm/services/product.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
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
        if(this.priceListList.length > 0){
          this.productPriceList = this.priceListList[0].item
          this.currentPriceListId = this.priceListList[0].id
        }
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
                      this.toastr.success('New price list is added');
                    },
                    (err) => {
                      this.toastr.error(err)
                    }
                  )
                } else {
                  const updateData = {
                    id: selectedPriceListId,
                    price_list_name: newPriceList.priceListName,
                    price_list_code: newPriceList.priceListCode
                  }
                  this.priceListService.updatePriceList(updateData)
                  .subscribe((res) => {
                    const temp = this.priceListList.findIndex(x => {return x.id === selectedPriceListId});
                    this.priceListList[temp].name = newPriceList.priceListName,
                    this.priceListList[temp].code = newPriceList.priceListCode
                    this.toastr.success('The price list is updated');
                  },
                  (error) => {
                    this.toastr.error(error);
                  })
                }
              }
        });
    }
  
  getProductList(){
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
        console.log(this.productList)
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
    console.log(this.priceListList.find((x) => {return x.id === this.currentPriceListId})?.item?.map(({productId, price}) => {return {productId: productId, price: price}}));

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Save all change",
      title: "Update price list item"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
    .afterClosed()
    .subscribe((submit) => {
        if (submit) {
          const data = {
            'price_list_id': this.currentPriceListId,
            'price_list_item_list': this.priceListList.find((x) => {return x.id === this.currentPriceListId})?.item?.map(({productId, price}) => {return {productId: productId, price: price}})
          }
          this.priceListService.updatePriceListItem(data)
          .subscribe((res) => {
            this.toastr.success('All changes are saved ')
          })
        }
    })
  }
}
