import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllEmployee (){
    return this.http.get('http://localhost:9002/hrm/employee/getAll', { headers: this.headers })
  }

  getEmployeeById (employeeId: string){
    return this.http.get(`http://localhost:9002/hrm/employee/getEmployeeById/${employeeId}`, { headers: this.headers })
  }

  createNewEmployee(data){
    return this.http.post('http://localhost:9002/hrm/employee/addEmployee', data, { headers: this.headers })
  }

  updateEmployee(data, employeeId: string){
    return this.http.post(`http://localhost:9002/hrm/employee/updateById/${employeeId}`, data, { headers: this.headers })
  }
}
