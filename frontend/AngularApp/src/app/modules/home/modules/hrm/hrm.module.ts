import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrmComponent } from './hrm.component';
import { HRMRoutingModule } from './hrm-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';



@NgModule({
  declarations: [
    HrmComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    EmployeeDetailComponent,
    DepartmentDetailComponent
  ],
  exports: [
    HrmComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    EmployeeDetailComponent,
    DepartmentDetailComponent
  ],
  imports: [
    CommonModule,
    HRMRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class HrmModule { }
