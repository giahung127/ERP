export class AbsentOverview {
    employeeId: string;
    employeeName: string;
    office: string;
    department: string;
    role: string;
    team: string;

    constructor(
        employeeId: string,
        employeeName: string,
        office: string,
        department: string,
        role: string,
        team: string
    ) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.department = department;
        this.office = office;
        this.role = role;
        this.team = team;
    }
}
