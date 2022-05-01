import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScmComponent } from './scm.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SCMRoutingModule } from './scm-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { SupplementListComponent } from './supplement-list/supplement-list.component';
import { SupplementDetailComponent } from './supplement-detail/supplement-detail.component';


@NgModule({
  declarations: [
    ScmComponent,
    ProductDetailComponent,
    ProductListComponent,
    CategoryListComponent,
    AddCategoryModalComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    ShippingListComponent,
    ShippingDetailComponent,
    UploadFileDialogComponent,
    SupplementListComponent,
    SupplementDetailComponent
  ],
  imports: [
    CommonModule,
    SCMRoutingModule,
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
export class ScmModule { }
