import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../../shared/models/department/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent {

  constructor(
    private router: Router
  ) { }
  departmentList: Department[] = [
    new Department('d001','Software Enginering', '0123456879', 'Nguyen Van A'),
    new Department('d002','Software Enginering', '0123456789', 'Nguyen Van A'),
    new Department('d003','Software Enginering', '0123456879', 'Nguyen Van A'),
    new Department('d004','Software Enginering', '0123456789', 'Nguyen Van A')
  ];
  columnName: string[] = [
    'DepartmentId',
    'Name',
    'Supervisor',
    'Phone'
  ];
  columnToProperty = {
    'DepartmentId': 'departmentId',
    'Name': 'name',
    'Supervisor': 'supervisor',
    'Phone': 'phone'
  };
  onAddDepartment: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/department-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/department-detail', id]);
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/hrm/department-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
