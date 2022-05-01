import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScmComponent } from './scm.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShippingListComponent } from './shipping-list/shipping-list.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplementListComponent } from './supplement-list/supplement-list.component';
import { SupplementDetailComponent } from './supplement-detail/supplement-detail.component';

const routes: Routes = [
    {
        path: '',
        component: ScmComponent,
        children: [
            {
                path: 'product-list',
                component: ProductListComponent
            },
            {
                path: 'product-detail',
                component: ProductDetailComponent
            },
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent
            },
            {
                path: 'supplement-list',
                component: SupplementListComponent
            },
            {
                path: 'supplement-detail/:id',
                component: SupplementDetailComponent
            },
            {
                path: 'supplement-detail',
                component: SupplementDetailComponent
            },
            {
                path: 'shipping-list',
                component: ShippingListComponent
            },
            {
                path: 'shipping-detail/:id',
                component: ShippingDetailComponent
            },
            {
                path: 'shipping-detail',
                component: ShippingDetailComponent
            },
            {
                path: 'supplier-list',
                component: SupplierListComponent
            },
            {
                path: 'supplier-detail/:id',
                component: SupplierDetailComponent
            },
            {
                path: 'supplier-detail',
                component: SupplierDetailComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SCMRoutingModule {}
