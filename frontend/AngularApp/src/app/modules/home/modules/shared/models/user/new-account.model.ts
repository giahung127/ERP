export class NewAccount {
    employeeId: string;
    username: string;
    password: string;

    constructor(employeeId: string, username: string, password: string) {
        this.employeeId = employeeId;
        this.username = username;
        this.password = password;
    }
}
