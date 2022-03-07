import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
    {
        path: '',
        component: SalesComponent,
        children: [
            {
                path: 'customer-list',
                component: CustomerListComponent
            },
            {
                path: 'customer-detail/:id',
                component: CustomerDetailComponent
            },
            {
                path: 'customer-detail',
                component: CustomerDetailComponent
            },
            {
                path: 'order-list',
                component: OrderListComponent
            },
            {
                path: 'order-detail',
                component: OrderDetailComponent
            },
            {
                path: 'order-detail',
                component: OrderDetailComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesRoutingModule {}
