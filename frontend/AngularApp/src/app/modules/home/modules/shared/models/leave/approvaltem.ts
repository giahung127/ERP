export class ApprovalItem {
    officeId: string;
    priority: number;
    positionId: string;
    positionName: string;
    approvers: string[];

    constructor(officeId: string, priority: number, positionId: string, positionName: string, approvers: string[]) {
        this.officeId = officeId;
        this.priority = priority;
        this.positionId = positionId;
        this.positionName = positionName;
        this.approvers = approvers;
    }
}
