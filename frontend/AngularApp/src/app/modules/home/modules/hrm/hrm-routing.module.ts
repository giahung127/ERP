import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HrmComponent } from './hrm.component';

const routes: Routes = [
    {
        path: '',
        component: HrmComponent,
        children: [
            {
                path: 'employee-list',
                component: EmployeeListComponent
            },
            {
                path: 'department-list',
                component: DepartmentListComponent
            },
            {
                path: 'employee-detail/:id',
                component: EmployeeDetailComponent
            },
            {
                path: 'employee-detail',
                component: EmployeeDetailComponent
            },
            {
                path: 'department-detail/:id',
                component: DepartmentDetailComponent
            },
            {
                path: 'department-detail',
                component: DepartmentDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HRMRoutingModule {}
