import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { SystemSettingComponent } from './system-setting.component';

const routes: Routes = [
    {
        path: '',
        component: SystemSettingComponent,
        children: [
            {
                path: 'company-setting',
                component: CompanySettingComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemSettingRoutingModule {}
