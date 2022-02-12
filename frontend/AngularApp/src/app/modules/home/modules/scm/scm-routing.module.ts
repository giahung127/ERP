import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScmComponent } from './scm.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SCMRoutingModule {}
