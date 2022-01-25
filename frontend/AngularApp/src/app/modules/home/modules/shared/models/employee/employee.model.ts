export class Employee {
    employeeId: string;
    name: string;
    phone: string;
    department: string;
    position: string;

    constructor(
        id: string,
        name: string,
        phone: string,
        department: string,
        position: string
    ) {
        this.employeeId = id;
        this.name = name;
        this.phone = phone;
        this.department = department;
        this.position = position;
    }
}
