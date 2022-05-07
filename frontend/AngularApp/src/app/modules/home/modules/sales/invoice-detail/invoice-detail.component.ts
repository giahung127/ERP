import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../scm/services/product.service';
import { ShippingService } from '../../scm/services/shipping.service';
import { Company } from '../../shared/models/company/company.model';
import { Customer } from '../../shared/models/customer/customer.model';
import { Invoice } from '../../shared/models/invoice/invoice.model';
import { Order } from '../../shared/models/order/order.model';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { CompanyService } from '../../system-setting/services/company.service';
import { CustomerService } from '../service/customer.service';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent {
  company: Company | undefined
  selectedInvoice: Invoice | undefined;
  orderList: Order[] = [];
  logoPath = `../../../../assets/logo/HCMUT_official_logo.png`;
  priceListList: PriceList[] = [];
  selectedInvoiceId = '';
  customerList: Customer[] = [];
  orderProductList: {orderId: string, orderProduct: ImportProduct[]}[] = [];
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
  )
  {
    this.route.queryParams.subscribe((params) => {  
      if (params['invoiceId']) {
        this.selectedInvoiceId = params['invoiceId']
        this.getCompanyInfo();
        this.getCustomerList();
      }
    })
  }

  columnName: string[] = [
    'Order Code',
    'Date',
    'Total(Inc. Tax)',
    'Status'
  ];
  columnToProperty = {
    'Order Code': 'orderCode',
    'Date': 'createdDate',
    'Total(Inc. Tax)': 'totalIncludeTax',
    'Status': 'status'
  };

  onBack() {
    this._location.back();
  }

  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],{
      queryParams: { id: id }
    });
  };

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

  getSelectedInvoice(invoiceId: string){
    this.invoiceService.getInvoiceById(invoiceId)
    .subscribe((res) => {
      let temp;
      temp = res
      this.selectedInvoice = {
        invoiceId: temp.data.id,
        invoiceCode: temp.data.code,
        totalTax: temp.data.totalTax,
        totalDiscount: temp.data.totalDiscount,
        total: temp.data.totalPrice,
        orderIdList: temp.data.orderIds,
        status: temp.data.invoiceStatus,
        creatorName: 'Gia Hung',
        createdDate: temp.data.createdDate 
      }
      this.getListOrder(temp.data.orderIds);
    })
  }
 
  getCustomerList(){
    this.customerService.getAllCustomerList()
    .subscribe((res) => {
      
      this.getPriceListList();
      let data;
      data = res
      this.customerList = data.map(({ id,code, name, phone, address})=>{
        return {
          'customerId': id,
          'customerCode': code,
          'name': name,
          'phone': phone,
          'address': address
        }
      })
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
        this.getSelectedInvoice(this.selectedInvoiceId);
    })
  }

  getListOrder(ids: string[]){
    this.orderService.getOrderByListIds(ids)
    .subscribe((res) => {
      let data;
      data = res;
      const orderList = data.data.map(data => {return data.order})
      this.orderList = orderList.map(({id, code, createDate, customerId, priceListId, customerName, totalIncludeTax, orderStatus}) => {
        return {
          'orderId': id,
          'orderCode': code,
          'createdDate': createDate,
          'customerId': customerId,
          'priceListId': priceListId,
          'customerName':customerName,
          'totalIncludeTax': totalIncludeTax,
          'status': orderStatus
        }
      })
      const productItem = data.data.map(data => {return data.orderItems}) 
      productItem.forEach((x) => {
        const priceListId = this.orderList.find(y=> {return y.orderId === x[0].orderId})?.priceListId;
        console.log(this.priceListList,this.priceListList.find(priceList => {return priceList.id === priceListId}))
        this.orderProductList.push({
          'orderId': x[0].orderId,
          'orderProduct': x.map(({id, orderId, productCode, productName, productId, amount, noNum})=>{
            return {
              'no': noNum,
              'productId': productId,
              'productCode': productCode,
              'productName': productName,
              'amount': amount,
              'price': this.priceListList.find(priceList => {return priceList.id === priceListId})?.item?.find(z => {return z.productId === productId})?.price || 0
            }
          })
        })
      })
    })
  }

    printPage(){
    let mywindow = window.open('', 'PRINT');
    mywindow?.document.write(`
    <div id="kv-cke-temp">
    <style type="text/css">.printBox {
            font-family: Arial, sans-serif;
            font-size: 11px;
        }
    
        table {
            page-break-inside: auto;
            border-collapse: collapse;
        }
    
            table td {
                word-wrap: break-word;
                word-break: break-all;
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
                <td style="font-size:11px; text-align:center"><span style="font-size:12px"><strong>${this.company?.name}</strong></span></td>
              </tr>
              <tr>
                <td style="font-size:11px; text-align:center">
                <p><span style="font-size:12px">Address:  ${this.company?.address}</span></p>
                </td>
              </tr>
              <tr>
                <td style="font-size:11px; text-align:center"><span style="font-size:12px">Phone:&nbsp;${this.company?.contactPhone}</span></td>
              </tr>
            </tbody>
          </table>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div style="padding:10px 0 0; text-align:center"><strong style="font-size:12px">INVOICE</strong></div>
    
    <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
      <tbody>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><span style="font-size:11px">Date: ${this.selectedInvoice?.createdDate}</span></td>
          <td><span style="font-size:11px">Invoice Code: ${this.selectedInvoice?.invoiceCode}</span></td>
        </tr>
        <tr>
          <td colspan="2"><span style="font-size:11px">Creator: ${this.selectedInvoice?.creatorName}</span></td>
        </tr>
        
        <tr>
          <td style="border-bottom:1px solid">&nbsp;</td>
          <td style="border-bottom:1px solid">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    
    <table cellpadding="3" style="width:98%">
      <tbody>
      ${this.printOrderList()}
      </tbody>
    </table>
    
    <table border="0" cellpadding="3" cellspacing="0" style="border-collapse:collapse; border-top:1px dashed; width:98%">
      <tfoot>
        <tr>
          <td style="font-size:11px; font-weight:bold; white-space:nowrap">Total:</td>
          <td style="font-size:11px; font-weight:bold; text-align:right">${this.selectedInvoice?.total}</td>
        </tr>
        <tr>
          <td style="font-size:11px; font-weight:bold; white-space:nowrap">Total discount:</td>
          <td style="font-size:11px; font-weight:bold; text-align:right">${this.selectedInvoice?.totalDiscount}</td>
        </tr>
        <tr>
          <td style="font-size:11px; font-weight:bold; white-space:nowrap"><span style="font-size:11px">Total Payment:</span></td>
          <td style="font-size:11px; font-weight:bold; text-align:right"><span style="font-size:11px">${<number>this.selectedInvoice?.total - <number>this.selectedInvoice?.totalDiscount}</span></td>
        </tr>
        <tr>
          <td style="font-size:11px; font-weight:bold; height:5px; white-space:nowrap">&nbsp;</td>
          <td style="font-size:11px; font-weight:bold; text-align:right">&nbsp;</td>
        </tr>
      </tfoot>
    </table>
    
    <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
      <tbody>
        <tr>
          <td style="width:33%">&nbsp;</td>
          <td style="border-top:1px dashed; width:33%">&nbsp;</td>
          <td style="width:33%">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    
    <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
      <tbody>
        <tr>
          <td colspan="3"><span style="font-size:10px"><strong>CUSTOMER INFORMATION:</strong></span></td>
        </tr>
        <tr>
          <td colspan="3"><span style="font-size:10px">Customer Code: ${this.customerList.find(x => {return x.customerId === this.orderList[0].customerId})?.customerCode}</span></td>
        </tr>
        <tr>
          <td colspan="3"><span style="font-size:10px">Customer Name: ${this.customerList.find(x => {return x.customerId === this.orderList[0].customerId})?.name}</span></td>
        </tr>
        <tr>
          <td style="width:33%">&nbsp;</td>
          <td style="border-top:1px dashed; width:33%">&nbsp;</td>
          <td style="width:33%">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    
    <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
      <tbody>
        <tr>
          <td style="text-align:center">
          <p><span style="font-size:10px">Trân trọng cảm ơn Quý Khách đã đến mua hàng tại LK&nbsp; &nbsp; Hẹn gặp lại.</span></p>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p>&nbsp;</p>
    </div>
    </div>
    `
      )
    setTimeout(function() {
      mywindow?.print();
      mywindow?.close();
    }, 100);
  }

  printOrderList(): string{
    let htmlString = '';
    this.orderList.forEach(x => {
      htmlString +=`
      <tr>
        <td colspan="6" style="padding-top:3px, margin-top:8px"><span style="font-size:11px">Order Code ${x.orderCode}</span></td>
      </tr>
      <tr>
        <table cellpadding="3" style="width:98%">
          <tbody>
            <tr>
              <td style="border-bottom:1px solid black; border-top:1px solid black; width:30%"><strong><span style="font-size:11px">Product</span></strong></td>
              <td style="border-bottom:1px solid black; border-top:1px solid black; width:20%"><strong><span style="font-size:11px">Price</span></strong></td>
              <td style="border-bottom:1px solid black; border-top:1px solid black; text-align:right; width:20%"><strong><span style="font-size:11px">Amount</span></strong></td>
              <td style="border-bottom:1px solid black; border-top:1px solid black; text-align:right"><strong><span style="font-size:11px">Total</span></strong></td>
            </tr>
            ${ 
              this.printProductList(x.orderId)
            }
          </tbody>
        </table>
      </tr>
        `
    });
    return htmlString 
  }

  printProductList(orderId: string): string{
    let htmlString = '';
    console.log(this.orderProductList.find(x => {x.orderId === orderId}))
    this.orderProductList.find(x => {return x.orderId === orderId})?.orderProduct.forEach(x => {
      console.log(x)
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

  onCancel(){
    this.invoiceService.updateInvoiceStatus({id: this.selectedInvoice?.invoiceId, invoiceStatus: 'CANCEL'})
    .subscribe((res) => {
      this.toastr.success('The invoice is cancelled');
      this.onBack();
    },
    (err) => {
      this.toastr.error(err.message);
    })
  }

  onPay(){
    this.invoiceService.updateInvoiceStatus({id: this.selectedInvoice?.invoiceId, invoiceStatus: 'PAID'})
    .subscribe((res) => {
      this.toastr.success('The invoice is paid');
      this.onBack();
    },
    (err) => {
      this.toastr.error(err.message);
    })
  }
  
}
