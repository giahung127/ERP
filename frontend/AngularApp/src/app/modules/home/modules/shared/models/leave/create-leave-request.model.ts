import { LeaveTime } from './leave-time.model';

export class LeaveRequestCreate {
    requesterId: string;
    employeeId: string;
    typeId: string;
    status: string;
    totalDayCount: number;
    leaveTimes: LeaveTime[];

    constructor(
        requesterId: string,
        employeeId: string,
        typeId: string,
        status: string,
        totalDayCount: number,
        leaveTimes: LeaveTime[]
    ) {
        this.requesterId = requesterId;
        this.employeeId = employeeId;
        this.typeId = typeId;
        this.status = status;
        this.totalDayCount = totalDayCount;
        this.leaveTimes = leaveTimes;
    }
}
