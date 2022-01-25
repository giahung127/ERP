export class LeaveType {
    typeId: string;
    name: string;
    description: string;
    leaveTypeCode: string;
    officeId: string;
    allowance: number;
    constructor(
        typeId: string,
        name: string,
        description: string,
        leaveTypeCode: string,
        officeId: string,
        allowance: number
    ) {
        this.typeId = typeId;
        this.name = name;
        this.description = description;
        this.leaveTypeCode = leaveTypeCode;
        this.officeId = officeId;
        this.allowance = allowance;
    }
}
