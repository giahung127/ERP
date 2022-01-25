export class CreateLeaveTypeRequest {
    name: string;

    description: string;

    leaveTypeCode: string;

    officeId: string;

    allowance: number;

    constructor(name: string, description: string, leaveTypeCode: string, officeId: string, allowance: number) {
        this.name = name;
        this.description = description;
        this.leaveTypeCode = leaveTypeCode;
        this.officeId = officeId;
        this.allowance = allowance;
    }
}
