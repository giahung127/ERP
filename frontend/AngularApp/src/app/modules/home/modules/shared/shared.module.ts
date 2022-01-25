import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatRadioModule } from '@angular/material/radio';

import { TableListComponent } from './table-list/table-list.component';
@NgModule({
    declarations: [TableListComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatMenuModule,
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule
    ],
    exports: [TableListComponent]
})
export class SharedModule {}
