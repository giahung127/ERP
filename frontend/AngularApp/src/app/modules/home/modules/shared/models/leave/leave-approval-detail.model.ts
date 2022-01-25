import { ApprovalStatus } from '.';
import { TableStatus } from '../components';

export class LeaveApprovalDetail {
    leaveId: string;
    requesterId: string;
    employeeId: string;
    positionName: string;
    positionCode: string;
    employeeName: string;
    leaveType: string;
    leaveTypeCode: string;
    totalDayCount: number;
    status: string;
    leaveTime: {
        id: number;
        leaveStart: string;
        leaveEnd: string;
        reason: string;
        hourCount: number;
    }[];
    approvalStatus: {
        priority: number;
        positionId: string;
        positionName: string;
        employeeName: string;
        approvedTime: string;
        Status: TableStatus<ApprovalStatus>;
    }[];

    constructor(
        leaveId: string,
        requesterId: string,
        positionName: string,
        positionCode: string,
        employeeId: string,
        employeeName: string,
        leaveType: string,
        leaveTypeCode: string,
        totalDayCount: number,
        status: string,
        leaveTime,
        approvalStatus
    ) {
        this.leaveId = leaveId;
        this.requesterId = requesterId;
        this.positionName = positionName;
        this.positionCode = positionCode;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.leaveType = leaveType;
        this.leaveTypeCode = leaveTypeCode;
        this.totalDayCount = totalDayCount;
        this.status = status;
        this.leaveTime = leaveTime;
        this.approvalStatus = approvalStatus;
    }
}
