export class LeaveRequestOverview {
    requestId: string;
    requesterId: string;
    employeeId: string;
    requestedAt: string;
    status: string;
    totalDayCount: number;
    leaveType: string;
    constructor(
        requestId: string,
        requesterId: string,
        employeeId: string,
        requestedAt: string,
        status: string,
        totalDayCount: number,
        leaveType: string
    ) {
        this.requestId = requestId;
        this.requesterId = requesterId;
        this.employeeId = employeeId;
        this.requestedAt = requestedAt;
        this.status = status;
        this.totalDayCount = totalDayCount;
        this.leaveType = leaveType;
    }
}
