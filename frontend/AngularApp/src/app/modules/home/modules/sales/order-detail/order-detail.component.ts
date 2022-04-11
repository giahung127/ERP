import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ProductService } from '../../scm/services/product.service';
import { ShippingService } from '../../scm/services/shipping.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Customer } from '../../shared/models/customer/customer.model';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { CustomerService } from '../service/customer.service';
import { OrderService } from '../service/order.service';
import { PriceListService } from '../service/price-list.service';

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
  selectedOrder;
  priceListList: PriceList[] = [];
  showProductList: Product[] = [];
  customerList: Customer[] = [];
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
  orderProductList: ImportProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private priceListService: PriceListService,
    private customerService: CustomerService,
    private shipmentService: ShippingService
  ) { 
    this.getCustomerList();
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

  getPriceListList(){
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
        this.route.queryParams.subscribe((params) => {  
          if (params['id']) {
            this.viewModeCheck = false;
            this.getSelectedOrder(params['id']);
          } else {
            this.viewModeCheck = true;
            this.selectedOrder = {
              orderId: "",
              createdDate: new Date(),
              status: "",
              creatorName: "GiaHung",
              priceListId: this.priceListList[0].id,
              priceListName: this.priceListList[0].name,
              totalIncludeTax: 0,
              totalExcludeTax: 0,
              tax: 0,
              discount: 0,
              shippingFee: 0,
              customerId: "",
              customerName: "",
            }
            this.getProductList();  
          } 
        })
    })
  }

  getSelectedOrder(orderId: string){
    this.orderService.getOrderById(orderId)
    .subscribe((res)=> {
      let temp;
      temp = res
      console.log(this.priceListList, temp.data.order.priceListId, this.priceListList.filter(x => {return x.id === temp.data.order.priceListId}))
      this.selectedOrder = {
        orderId: temp.data.order.id,
        createdDate: new Date(temp.data.order.createDate).toDateString(),
        status: temp.data.order.orderStatus,
        creatorName: temp.data.order.creatorName,
        priceListId: temp.data.order.priceListId,
        priceListName: this.priceListList.filter(x => {return x.id === temp.data.order.priceListId})[0].name,
        totalIncludeTax: temp.data.order.totalIncludeTax,
        totalExcludeTax: temp.data.order.totalExcludeTax,
        tax: temp.data.order.tax,
        discount: temp.data.order.discount,
        shippingFee: temp.data.order.shippingFee,
        customerId: temp.data.order.customerId,
        customerName: temp.data.order.customerName,
      }
      const selectedPricelist = this.priceListList.find(x => {return x.id === this.selectedOrder.priceListId})
      this.orderProductList = temp.data.orderItems.map(({ noNum, productId, productCode, productName, amount})=>{
        return {
          'no': noNum,
          'productId': productId,
          'productCode': productCode,
          'productName': productName,
          'amount': amount,
          'price': selectedPricelist?.item?.find(x => {return x.productId === productId})?.price || 0
        }
      })
      console.log(selectedPricelist, this.orderProductList)
      this.reIndexNo();
      // this.shipmentService.getShipmentById()
      console.log(this.selectedOrder)
    })
  }

  getCustomerList(){
    this.customerService.getAllCustomerList()
    .subscribe((res) => {
      
      this.getPriceListList();
      let data;
      data = res
      this.customerList = data.map(({ id, name, phone, address})=>{
        return {
          'customerId': id,
          'name': name,
          'phone': phone,
          'address': address
        }
      })
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
    const data = this.orderProductList.filter(x => {return x.productId === id})[0]
    if(data){
      data.amount += 1;
    } else {
      const product = this.productList.filter(x => {return x.productId === id})[0]
      const price = this.priceListList.find(x => {return x.id === this.selectedOrder.priceListId})?.item?.find(y => {return y.productId === product.productId})?.price
      console.log(this.priceListList.find(x => {return x.id === this.selectedOrder.priceListId})?.item)
      this.orderProductList.push(new ImportProduct(this.orderProductList.length +1, product.productId, product.productCode, product.productName, 1, price? price : 0))
    }
    this.reCalculateTotal();
  }

  reCalculateTotal(){
    this.totalPrice = 0;
    this.orderProductList.forEach((x)=> {
      this.totalPrice += x.amount*x.price;
    })
  }
  reIndexNo() {
    for (let i = 0; i < this.orderProductList.length; i++) {
        this.orderProductList[i].no = i + 1;
    }
  }

  delete(item) {
    this.orderProductList = this.orderProductList.filter((product) => {
        return product.productId !== item;
    });
    this.reIndexNo();
  }

  onSave(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Create a new order with these information",
      title: "Create a new order"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
            .afterClosed()
            .subscribe((submit) => {
                if (submit) {
                  const data = {
                    creator_name: "giahung",
                    price_list_id: this.selectedOrder.priceListId,
                    total_include_tax: this.totalPrice,
                    total_exclude_tax: this.totalPrice,
                    tax: 0,
                    discount: 0,
                    shipping_fee: 0,
                    address: 'abc',
                    create_date: this.selectedOrder.createDate,
                    customer_id: this.selectedOrder.customerId,
                    customer_name: this.customerList.find((x)=> {return x.customerId === this.selectedOrder.customerId})?.name,
                    product_item_list: this.orderProductList,
                  }
                  console.log(this.customerList.find((x)=> {return x.customerId === this.selectedOrder.customerId})?.name )
                  this.orderService.createNewOrder(data)
                    .subscribe((res) => {
                      this.toastr.success('New order is successfully created');
                      console.log(res);
                      this.onBack()
                      const temp = {}
                      // this.shipmentService.addNewShipment(temp)
                      // .subscribe()
                    })
                }
            });
  }

  getProductPriceList(id: string){
    if(this.priceListList.filter(x=> {return x.id === id})[0].item === undefined){
      this.priceListService.getPriceListById(id)
          .subscribe((res) => {
            let temp;
            temp = res
            if(temp.data.order !== null){
              this.priceListList.filter(x=> {return x.id === id})[0].item = temp.data.order.price_list_items
            }
            else {
              this.priceListList.filter(x=> {return x.id === id})[0].item = []
            }
            this.changePriceList(id);
          })
    } else {
      this.changePriceList(id);
    }
  }

  changePriceList(priceListId: string){
    this.orderProductList.forEach(x => {
      const tempProduct = this.priceListList.filter(x => {return x.id === priceListId})[0].item?.filter(y => {return y.productId === x.productId})[0]
      x.price = tempProduct ? tempProduct.price : 0;
    })
    this.reCalculateTotal();
  }

  onConfirm(){
    this.orderService.updateOrderStatus({id: this.selectedOrder.id, orderStatus: 'CONFIRMED'})
    .subscribe((res) => {
      this.toastr.success('The order is confirmed');
    },
    (err) => {
      this.toastr.error(err);
    })
  }
}
