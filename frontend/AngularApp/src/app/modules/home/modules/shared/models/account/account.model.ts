export class Account {
    accountId: string;
    username: string;
    employeeId: string;
    status: string;
    employeeName?: string;
    employeeCode?: string;

    constructor(
        accountId: string,
        username: string,
        employeeId: string,
        status: string
    ) {
        this.accountId = accountId;
        this.username = username;
        this.employeeId = employeeId;
        this.status = status;
    }
}
