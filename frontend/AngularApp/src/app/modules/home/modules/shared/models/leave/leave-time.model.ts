export class LeaveTime {
    leaveStart: string;
    leaveEnd: string;
    reason: string;
    hourCount: number;

    constructor(leaveStart: string, leaveEnd: string, reason: string, hourCount: number) {
        this.leaveStart = leaveStart;
        this.leaveEnd = leaveEnd;
        this.reason = reason;
        this.hourCount = hourCount;
    }
}
