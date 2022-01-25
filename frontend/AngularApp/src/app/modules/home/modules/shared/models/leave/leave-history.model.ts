import { LeaveStatus, LeaveType } from './enum.model';
import { TableStatus } from '../components';

export class LeaveHistory {
    id: string;
    Date: string;
    Count: number;
    Type: LeaveType;
    Status: TableStatus<LeaveStatus>;

    constructor(id: string, date: string, count: number, type: LeaveType, status: TableStatus<LeaveStatus>) {
        this.id = id;
        this.Date = date;
        this.Count = count;
        this.Type = type;
        this.Status = status;
    }
}
