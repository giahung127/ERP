export class AccountList {
    accountId: string;
    employeeId: string;
    name: string;
    username: string;

    constructor(accountId: string, employeeId: string, name: string, username: string) {
        this.accountId = accountId;
        this.employeeId = employeeId;
        this.name = name;
        this.username = username;
    }
}
