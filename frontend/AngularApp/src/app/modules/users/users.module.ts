import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { SharedModule } from '../home/modules/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    ActivateAccountComponent
  ],
  imports: [
    CommonModule,
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
    SharedModule,
    UsersRoutingModule
    
  ]
})
export class UsersModule { }
