import { ApprovalStatus } from '.';
import { TableStatus } from '../components';

export class LeaveApprovalOverview {
    leaveId: string;
    employeeId: string;
    employeeName: string;
    roleName: string;
    leaveType: string;
    duration: string;
    Status: TableStatus<ApprovalStatus>;
    requestedAt: string;

    constructor(
        leaveId: string,
        employeeId: string,
        employeeName: string,
        roleName: string,
        leaveType: string,
        duration: string,
        status: TableStatus<ApprovalStatus>,
        requestedAt: string
    ) {
        this.leaveId = leaveId;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.roleName = roleName;
        this.leaveType = leaveType;
        this.duration = duration;
        this.Status = status;
        this.requestedAt = requestedAt;
    }
}
