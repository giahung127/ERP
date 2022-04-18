import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingComponent } from './system-setting.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
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
import { SharedModule } from '../shared/shared.module';
import { CompanySettingComponent } from './company-setting/company-setting.component';


@NgModule({
  declarations: [
    SystemSettingComponent,
    CompanyInformationComponent,
    CompanySettingComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
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
export class SystemSettingModule { }
