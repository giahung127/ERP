import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { InvoiceService } from '../sales/service/invoice.service';
import { OrderService } from '../sales/service/order.service';
import { Invoice } from '../shared/models/invoice/invoice.model';
import { Order } from '../shared/models/order/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedBestSeller = 3;
  totalInTimeRange = 0 ;
  numOrderInTimeRange = 0;
  numPaidInvoiceInTimeRange = 0;
  numUnpaidInvoiceInTimeRange = 0;
  invoiceList: Invoice[] = []
  orderList: Order[] = []
  dataChartProduct: {name: string, value: number}[] = [];
  showChartProduct: {name: string, value: number}[] = [];
  dataChart: {name: string, value: number}[] = [];
  customColor: {name: string, value: string}[] = [];
  startDate = moment(new Date()).startOf('isoWeek').format('YYYY-MM-DD');
  endDate = moment(new Date()).endOf('isoWeek').format('YYYY-MM-DD');
  range = new FormGroup({
      start: new FormControl(this.startDate),
      end: new FormControl(this.endDate)
  });
  listBestSeller:{name: string, value: number}[] = [{name: 'Top 3', value: 3}, {name: 'Top 5', value: 5}, {name: 'Top 10', value: 10}]
  constructor(
    private invoiceService: InvoiceService,
    private orderService: OrderService
  ){
    this.getAllInvoiceList();
    this.getAllOrderList();
  }

  changeRange() {
    if (this.range.controls['start'].value && this.range.controls['end'].value) {
      const dateList = this.getDateRange(moment(this.range.controls['start'].value), moment(this.range.controls['end'].value));
      this.buildDataChart(dateList);
      this.buildStatistic(moment(this.range.controls['start'].value), moment(this.range.controls['end'].value));
    }
  }
  
  getAllInvoiceList(){
    this.invoiceService.getAllInvoiceList()
    .subscribe((res)=> {
      let temp;
      temp = res
      this.invoiceList = temp.data.map(({id, code, invoiceStatus, orderIds,totalTax, totalDiscount, totalPrice, createdDate })=>{
        return {
          'invoiceId': id,
          'invoiceCode': code,
          'totalTax': totalTax,
          'totalDiscount': totalDiscount,
          'total': totalPrice,
          'orderIdList': orderIds,
          'createdDate': new Date(createdDate).toDateString(),
          'status': invoiceStatus,
          'creatorName': 'Gia Hung'
        }
      })
      this.changeRange()
    })
  }

  getAllOrderList(){
    this.orderService.getAllOrdersList()
    .subscribe((res)=> {
      let data;
      data = res;
      this.orderList = data.map(({ id, creatorName,code, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
        return {
          'orderId': id,
          'orderCode': code,
          'createdDate': createDate,
          'customerName': customerName,
          'status': orderStatus
        }
      })
      this.orderService.setLocalList(this.orderList);
    })
  }

  buildDataChart(dateList: string[]){
    this.dataChart = []
    let orderIds: string [] = [];
    dateList.forEach((date) => {
      let temp = {name: date, value: 0}
      this.invoiceList.filter((_invoice)=> {return _invoice.status === 'PAID' && moment(_invoice.createdDate).format('DD-MM-YYYY') === date})
      .forEach((invoice) => {
        temp.value += invoice.total;
        orderIds = [...orderIds, ...invoice.orderIdList]
      })
      console.log([date, this.invoiceList.filter((_invoice)=> {return _invoice.status === 'PAID' && moment(_invoice.createdDate).format('DD-MM-YYYY') === date})])
      this.dataChart.push(temp);
      this.customColor.push({name: date, value:'#000000'});
    })
    this.orderService.getOrderByListIds(orderIds)
    .subscribe((res) => {
      let temp;
      let tempData: {id: string, name: string, amount: number}[] = [];
      temp = res
      temp.data = temp.data.map((x) => {return x.orderItems})
      temp.data = [].concat(...temp.data)
      temp.data.forEach((x) => {
        if(tempData.map(dta => {return dta.id}).includes(x.productId)){
          tempData.filter((y) => {return y.id === x.productId})[0].amount += x.amount
        } else {
          tempData.push({id: x.productId , name: x.productName, amount: x.amount})
        }
      })
      this.dataChartProduct = tempData.sort((a, b) => a.amount > b.amount ? -1 : 1).map(({id, name, amount})=> {
        return {
          name: name,
          value: amount
        }
      })
      this.bestSellerChange()
    })
  }

  buildStatistic(startDate: moment.Moment, endDate: moment.Moment){
    this.totalInTimeRange = 0;
    const paidInvoiceList = this.invoiceList.filter((x) => {return x.status !== 'CANCEL'&& startDate <= moment(x.createdDate) && endDate >= moment(x.createdDate) && x.status === 'PAID'});
    const unpaidInvoiceList = this.invoiceList.filter((x) => {return x.status !== 'CANCEL'&& startDate <= moment(x.createdDate) && endDate >= moment(x.createdDate) && x.status === 'UNPAID'});
    const orderTempList = this.orderList.filter((x) => {return x.status !== 'CANCEL' && startDate <= moment(x.createdDate) && endDate >= moment(x.createdDate)});
    this.numPaidInvoiceInTimeRange = paidInvoiceList.length;
    this.numUnpaidInvoiceInTimeRange = unpaidInvoiceList.length;
    this.numOrderInTimeRange = orderTempList.length
    paidInvoiceList.forEach((x) => {
      this.totalInTimeRange += x.total;
    })
  }

  getDateRange(startDate: moment.Moment, endDate: moment.Moment) {
    const dateList: string[] = [];
    let curDate = startDate;
    while (curDate <= endDate) {
        dateList.push(moment(curDate).format('DD-MM-YYYY'));
        curDate = moment(curDate).add(1, 'd');
    }
    return dateList;
  }

  bestSellerChange(){
    if(this.selectedBestSeller < this.dataChartProduct.length){
      this.showChartProduct = this.dataChartProduct.slice(0, this.selectedBestSeller)
    } else {
      this.showChartProduct = this.dataChartProduct
    }
  }
}
