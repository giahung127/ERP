import { LeaveType } from './enum.model';

export class LeaveOverview {
    period: string;
    type: LeaveType;
    constructor(period: string, type: LeaveType) {
        this.period = period;
        this.type = type;
    }
}
