import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/services';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => {
            return import('./modules/home/home.module').then((m) => {
                return m.HomeModule;
            });
        },
        // canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => {
            return import('./modules/users/users.module').then((m) => {
                return m.UsersModule;
            });
        }
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
