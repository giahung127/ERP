export class Employee {
    employeeId: string;
    code: string;
    name: string;
    phone: string;
    role: string;

    constructor(    
        id: string,
        code: string,
        name: string,
        phone: string,
        role: string
    ) {
        this.employeeId = id;
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.role = role;
    }
}
