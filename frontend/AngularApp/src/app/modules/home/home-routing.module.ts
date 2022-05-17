import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/dashboard/dashboard.module').then((m) => {
                return m.DashboardModule;
            });
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'hrm',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/hrm/hrm.module').then((m) => {
                return m.HrmModule;
            });
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'scm',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/scm/scm.module').then((m) => {
                return m.ScmModule;
            });
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'sales',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/sales/sales.module').then((m) => {
                return m.SalesModule;
            });
        },
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/dashboard/dashboard.module').then((m) => {
                return m.DashboardModule;
            });
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'setting',
        component: HomeComponent,
        loadChildren: () => {
            return import('./modules/system-setting/system-setting.module').then((m) => {
                return m.SystemSettingModule;
            });
        },
        
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
