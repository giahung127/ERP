export class Department {
    departmentId: string;
    name: string;
    phone: string;
    supervisor: string;

    constructor(departmentId: string, name: string, phone: string, supervisor: string){
        this.departmentId = departmentId;
        this.name = name;
        this.phone = phone;
        this.supervisor = supervisor;
    }
}

