import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
