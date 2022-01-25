export class ApproversListByPosition {
    positionId: string;
    approvers: { employeeId: string; employeeName: string; officeId: string }[];

    constructor(positionId: string, approvers: { employeeId: string; employeeName: string; officeId: string }[]) {
        this.positionId = positionId;
        this.approvers = approvers;
    }
}
