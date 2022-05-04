import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ProductService } from '../../scm/services/product.service';
import { ShippingService } from '../../scm/services/shipping.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Company } from '../../shared/models/company/company.model';
import { Customer } from '../../shared/models/customer/customer.model';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { Shipment } from '../../shared/models/shipment/shipment.model';
import { CompanyService } from '../../system-setting/services/company.service';
import { CustomerService } from '../service/customer.service';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  viewModeCheck = true;
  saveCheck = false;
  confirmCheck = true;
  toolTip = 'Insufficient amount: '
  searchKeyword = '';
  company: Company | undefined;
  productList: Product[] = [];
  totalPrice = 0;
  autoCode = '';
  selectedOrder;
  priceListList: PriceList[] = [];
  showProductList: Product[] = [];
  customerList: Customer[] = [];
  shipmentList: Shipment[] = [];
  productColumnName: string[] = [
    'Code',
    'Name',
    'Category',
  ];
  productColumnToProperty = {
    'Code': 'productCode',
    'Name': 'productName',
    'Category': 'categoryName',
  };
  shipmentColumnName: string[] = [
    'Code',
    'Receiver',
    'Contact number',
    'Created date',
    'Status'
  ];
  shipmentColumnToProperty = {
    'Code': 'shipmentCode',
    'Receiver': 'contactName',
    'Contact number': 'contactNumber',
    'Created date': 'createdDate',
    'Status' : 'status'
  };
  orderProductList: ImportProduct[] = [];
  logoPath = `../../../../assets/logo/HCMUT_official_logo.png`;
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private priceListService: PriceListService,
    private customerService: CustomerService,
    private shipmentService: ShippingService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService
  ) { 
    this.getCustomerList();
    this.getCompanyInfo();
  }

  getProductList() {
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name, price, categoryName, description, amount})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryName': categoryName,
            'price': price,
            'description': description,
            'amount': amount
          }
        })
        this.showProductList = this.productList;
        
        this.confirmCheck = this.checkConfirm();
      })
  }

  getShipmentList(orderId: string){
    this.shipmentService.getShipmentByOrderId(orderId)
    .subscribe(res => {
      let temp;
      temp = res;
      if(temp.data !== null){
        this.shipmentList = temp.data.map(({id, code, orderId, createdDate, receiverName, contactAddress, contactNumber, shipmentStatus}) => {
          return {
            shipmentId: id,
            shipmentCode: code,
            orderId: orderId,
            createdDate: new Date(createdDate).toDateString(),
            creatorName: 'Gia Hung',
            contactName: receiverName, 
            contactAddress: contactAddress,
            contactNumber: contactNumber,
            status: shipmentStatus
          }
        })
      }
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
            this.getShipmentList(params['id']);
          } else {
            this.viewModeCheck = true;
            this.selectedOrder = {
              orderId: "",
              orderCode: "",
              createdDate: "",
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
              shipping: false
            } 
          } 
          this.getProductList(); 
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
        orderCode: temp.data.order.code,
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
        invoiceId: temp.data.order.invoiceId
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
      this.reIndexNo();
      // this.shipmentService.getShipmentById()
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

  getCompanyInfo(){
    this.companyService.getCompanyInfo()
    .subscribe((res) => {
      if(res){
        console.log(res)
        let temp
        temp = res
        this.company = new Company(temp.id, temp.companyName, temp.companyAddress, temp.contactName, temp.contactEmail, temp.contactPhone ,temp.contactAddress)
      }
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
    this.check();
  }

  reCalculateTotal(){
    this.totalPrice = 0;
    this.orderProductList.forEach((x)=> {
      this.totalPrice += x.amount*x.price;
    })
    this.selectedOrder.totalExcludeTax = this.totalPrice 
    this.selectedOrder.totalIncludeTax = this.totalPrice * (1 + this.selectedOrder.tax/100)
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
    this.reCalculateTotal()
    this.check();
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
              code: this.selectedOrder.orderCode,
              creator_name: "giahung",
              price_list_id: this.selectedOrder.priceListId,
              total_include_tax: this.totalPrice,
              total_exclude_tax: this.totalPrice,
              tax: this.selectedOrder.tax,
              discount: 0,
              shipping_fee: 0,
              address: 'abc',
              create_date: new Date(),
              customer_id: this.selectedOrder.customerId,
              customer_name: this.customerList.find((x)=> {return x.customerId === this.selectedOrder.customerId})?.name,
              product_item_list: this.orderProductList,
            }
            this.orderService.createNewOrder(data)
              .subscribe((res) => {
                this.toastr.success('New order is successfully created');
                if(this.selectedOrder.shipping){
                  let temp;
                  temp = res
                  const shipmentData = {
                    'transporter_id': '',
                    'receiver_name': data.customer_name,
                    'contact_number': this.customerList.find((x)=> {return x.customerId === this.selectedOrder.customerId})?.phone,
                    'contact_address': this.customerList.find((x)=> {return x.customerId === this.selectedOrder.customerId})?.address,
                    'customer_name': data.customer_name,
                    'order_id': temp.data,
                    'total_price': this.selectedOrder.totalIncludeTax,
                    'code': '',
                    'created_date': new Date(),
                    'creator_name': 'Gia Hung',
                    'shipment_status': 'IN_STOCK',
                    'shipmen_item_list':this.orderProductList.map(({productId, amount}) => {
                      return {
                        'product_id': productId,
                        'amount': amount
                      }
                    })
                  }
                  this.shipmentService.addNewShipment(shipmentData)
                  .subscribe((res) => {
                    this.toastr.success('New shipment is successfully created');
                  },
                  (err) => {
                    this.toastr.error(err);
                  })
                }
                this.onBack();
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
    this.check();
  }

  changePriceList(priceListId: string){
    this.orderProductList.forEach(x => {
      const tempProduct = this.priceListList.filter(x => {return x.id === priceListId})[0].item?.filter(y => {return y.productId === x.productId})[0]
      x.price = tempProduct ? tempProduct.price : 0;
    })
    this.reCalculateTotal();
  }

  onConfirm(){
    this.orderService.updateOrderStatus({id: this.selectedOrder.orderId, orderStatus: 'CONFIRMED'})
    .subscribe((res) => {
      this.toastr.success('The order is confirmed');
      this.onBack();
    },
    (err) => {
      this.toastr.error(err.message);
    })
  }

  onCancel(){
    this.orderService.cancelOrderById(this.selectedOrder.orderId)
    .subscribe((res) => {
      this.toastr.success('The order is cancelled');
      this.onBack();
    },
    (err) => {
      this.toastr.error(err);
    })
  }

  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/shipping-detail'],{
        queryParams: { shipment: id }
      }
    );
    
  };

  printPage(){
    let mywindow = window.open('', 'PRINT');
    mywindow?.document.write(`
      <div id="kv-cke-temp">
      <style type="text/css">
          .printBox {
              font-family: Arial, sans-serif;
              font-size: 11px;
          }

          table {
              page-break-inside: auto;
              border-collapse: collapse;
          }

          tr {
              page-break-inside: avoid;
              page-break-after: auto
          }

          img {
              max-width: 100%;
              height: auto;
          }
      </style>
      <div class="printBox">
      <table style="width:100%">
        <tbody>
          <tr>
            <td style="text-align:center">
            <table style="width:100%">
              <tbody>
                <tr>
                <td style="font-size:11px; text-align:center">
                <img alt="" src="${this.logoPath}" style="height:50px; width:50px; " />
                </td>
                </tr>
                <tr>
                  <td style="font-size:11px; text-align:center"><strong style="font-size:11px">${this.company?.name}</strong></td>
                </tr>
                <tr>
                  <td style="font-size:11px; text-align:center">Address: ${this.company?.address}</td>
                </tr>
                <tr>
                  <td style="font-size:11px; text-align:center">Phone: ${this.company?.contactPhone}</td>
                </tr>
              </tbody>
            </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="padding:10px 0 0; text-align:center"><strong style="font-size:12px">SALE ORDER</strong></div>

      <table style="width:100%">
        <tbody>
          <tr>
            <td style="font-size:11px; text-align:center">Order code: ${this.selectedOrder.orderCode}</td>
          </tr>
          <tr>
            <td style="font-size:11px; text-align:center">${this.selectedOrder.createdDate}</td>
          </tr>
        </tbody>
      </table>

      <table style="margin:10px 0 15px; width:100%">
        <tbody>
          <tr>
            <td style="font-size:11px">Customer: ${this.selectedOrder.customerName}</td>
          </tr>
          <tr>
            <td style="font-size:11px">Phone: ${this.customerList.find(x => {return x.customerId === this.selectedOrder.customerId})?.phone}</td>
          </tr>
          <tr>
            <td style="font-size:11px">Address: ${this.customerList.find(x => {return x.customerId === this.selectedOrder.customerId})?.address}</td>
          </tr>
        </tbody>
      </table>

      <table cellpadding="3" style="width:98%">
        <tbody>
          <tr>
            <td style="border-bottom:1px solid black; border-top:1px solid black; width:30%"><strong><span style="font-size:11px">Product</span></strong></td>
            <td style="border-bottom:1px solid black; border-top:1px solid black; width:20%"><strong><span style="font-size:11px">Price</span></strong></td>
            <td style="border-bottom:1px solid black; border-top:1px solid black; text-align:right; width:20%"><strong><span style="font-size:11px">Amount</span></strong></td>
            <td style="border-bottom:1px solid black; border-top:1px solid black; text-align:right"><strong><span style="font-size:11px">Total</span></strong></td>
          </tr>
          ${ 
            this.printProductList()
          }
        </tbody>
      </table>

      <table border="0" cellpadding="3" cellspacing="0" style="border-collapse:collapse; margin-top:20px; width:98%">
        <tfoot>
          <tr>
            <td style="font-size:11px; font-weight:bold; text-align:right; white-space:nowrap">Subtotal</td>
            <td style="font-size:11px; font-weight:bold; text-align:right">${this.selectedOrder.totalExcludeTax}</td>
          </tr>
          <tr>
            <td style="font-size:11px; font-weight:bold; text-align:right; white-space:nowrap">Tax rate(%):</td>
            <td style="font-size:11px; font-weight:bold; text-align:right">${this.selectedOrder.tax}%</td>
          </tr>
          <tr>
            <td style="font-size:11px; font-weight:bold; text-align:right; white-space:nowrap">Total:</td>
            <td style="font-size:11px; font-weight:bold; text-align:right">${this.selectedOrder.totalExcludeTax}</td>
          </tr>
        </tfoot>
      </table>

      <table style="margin-top:20px; width:100%">
        <tbody>
          <tr>
            <td style="font-size:11px; font-style:italic; text-align:center">Thank you for your order!</td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>`
      )
    setTimeout(function() {
      mywindow?.print();
      mywindow?.close();
    }, 100);
  }

  printProductList(): string{
    let htmlString = '';
    this.orderProductList.forEach(x => {
      htmlString +=`
        <tr>
          <td style="border-bottom:1px dashed black"><span style="font-size:12px">${x.productName}</span></td>
          <td style="border-bottom:1px dashed black"><span style="font-size:11px">${x.price}</span></td>
          <td style="border-bottom:1px dashed black; text-align:right"><span style="font-size:11px">${x.amount}</span></td>
          <td style="border-bottom:1px dashed black; text-align:right"><span style="font-size:11px">${x.amount*x.price}</span></td>
        </tr>
        `
    });
    return htmlString 
  }

  check(){
    this.saveCheck = this.orderProductList.length > 0 && this.selectedOrder.priceListId !== '' && this.selectedOrder.customerId !== '';
  }

  toInvoice(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    if(this.selectedOrder.invoiceId === null){
      dialogConfig.data = {
        message: "Create a new invoice for this order",
        title: "Create a new invoice"
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed()
      .subscribe((submit) => {
        if (submit) {
          const data = {
            'orderIdList': [this.selectedOrder.orderId]
          }
          this.invoiceService.createNewInvoice(data)
          .subscribe((res) => {
            this.toastr.success('The new invoice is created');
          })
        }
      });
    } else {
      dialogConfig.data = {
        message: "The order already has an invoice. Go to invoice details?",
        title: "Invoice already exists"
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed()
      .subscribe((submit) => {
        if (submit) {
          this.router.navigate(['/home/sales/invoice-detail'],
          {
            queryParams: { invoiceId: this.selectedOrder.invoiceId }
          });
        }
      });
    }
  }

  // getNeedItemList(){
  //   const check = this.productService.getLocalNeedItem()
  //   if(!check){
  //     this.orderService.getOrderByStatus('WAITING')
  //     .subscribe((res) => {
  //       const tempList: {productId: string, amount: number}[] = [];
  //       let temp;
  //       temp = res
  //       temp.data = temp.data.map((x) => {return x.orderItems})
  //       temp.data = [].concat(...temp.data)
  //       temp.data.forEach((x) => {
  //         if(tempList.find(item => {return item.productId === x.productId})){
  //           tempList.filter(item => {return item.productId === x.productId})[0].amount += x.amount;
  //         } else {
  //           tempList.push({productId: x.productId, amount: x.amount})
  //         }
  //       })
  //       console.log(tempList)
  //       this.confirmCheck =this.checkConfirm(tempList)
  //     })
  //   }
  // }

  checkConfirm(){
    let check = true;
    console.log(this.orderProductList)
    this.orderProductList.forEach(x => {
      const temp = this.productList.find(y => {return y.productId === x.productId})
      if(temp && temp.amount < x.amount){
        check = false;
        this.toolTip += temp.productCode + ', ' 
      }
    })
    return check;
  }
}
