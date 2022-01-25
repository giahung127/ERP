export class NewAccountList {
    employeeId: string;
    name: string;
    username: string;
    password: string;

    constructor(employeeId: string, name: string, username: string, password: string) {
        this.employeeId = employeeId;
        this.name = name;
        this.username = username;
        this.password = password;
    }
}
