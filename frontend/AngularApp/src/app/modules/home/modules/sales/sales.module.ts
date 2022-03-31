import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { PriceListComponent } from './price-list/price-list.component';
import { AddPriceListModalComponent } from './add-price-list-modal/add-price-list-modal.component';
import { AddProductToPriceListModalComponent } from './add-product-to-price-list-modal/add-product-to-price-list-modal.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    SalesComponent,
    OrderListComponent,
    OrderDetailComponent,
    PriceListComponent,
    AddPriceListModalComponent,
    AddProductToPriceListModalComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTreeModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    SharedModule
  ]
})
export class SalesModule { }
