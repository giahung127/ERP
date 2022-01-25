import { EmployeeStatus } from './enum.model';
import { TableStatus } from '../components';

export class TeamEmployee {
    Code: string;
    Name: string;
    Phone: string;
    Email: string;
    Status: TableStatus<EmployeeStatus>;

    constructor(code: string, name: string, phone: string, email: string, status: TableStatus<EmployeeStatus>) {
        this.Code = code;
        this.Name = name;
        this.Phone = phone;
        this.Email = email;
        this.Status = status;
    }
}
