import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
// import { AuthGuard } from '../../core/services';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/dashboard/dashboard.module').then((m) => {
                return m.DashboardModule;
            });
        },
        // canActivate: [AuthGuard]
    },
    {
        path: 'hrm',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/hrm/hrm.module').then((m) => {
                return m.HrmModule;
            });
        },
        // canActivate: [AuthGuard]
    },
    {
        path: 'scm',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/scm/scm.module').then((m) => {
                return m.ScmModule;
            });
        },
        // canActivate: [AuthGuard]
    },
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/dashboard/dashboard.module').then((m) => {
                return m.DashboardModule;
            });
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
