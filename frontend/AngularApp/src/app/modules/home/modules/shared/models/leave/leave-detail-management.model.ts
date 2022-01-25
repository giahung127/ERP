export class LeaveDetailManagement {
    employeeId: string;
    name: string;
    team: string;
    year: number;
    joindate: string;
    position: string;
    leaveType: string;
    typeId: string;
    total: number;
    remaining: number;
    taken: number;
    bonus: number;
    paid: number;
    forwardNextYear: number;

    constructor(
        employeeId: string,
        name: string,
        team: string,
        year: number,
        joindate: string,
        position: string,
        leaveType: string,
        typeId: string,
        total: number,
        remaining: number,
        taken: number,
        bonus: number,
        paid: number,
        forwardNextYear: number
    ) {
        this.employeeId = employeeId;
        this.name = name;
        this.team = team;
        this.year = year;
        this.joindate = joindate;
        this.position = position;
        this.leaveType = leaveType;
        this.typeId = typeId;
        this.total = total;
        this.remaining = remaining;
        this.taken = taken;
        this.bonus = bonus;
        this.paid = paid;
        this.forwardNextYear = forwardNextYear;
    }
}
