export class EmployeeDetail {
    employeeId: string;
    employeeName?: string;
    sex?: boolean;
    joinDate?: Date;

    changeDatePos?: Date;
    changeDateLoc?: Date;

    bankName: string;
    bankNumber: string;

    age?: number;
    birthday?: Date;
    address?: string;
    nationality?: string;
    phone?: string;
    email?: string;
    image?: string;

    teamId?: string;
    teamName?: string;

    roleId?: string;
    roleName?: string;

    departmentId?: string;
    departmentName?: string;

    officeId?: string;
    officeName?: string;

    companyId?: string;
    constructor(
        _EmployeeId: string,
        _EmployeeName: string,
        _Sex: boolean,
        _JoinDate: Date,
        _ChaneDatePos: Date,
        _ChaneDateLoc: Date,
        _BankName: string,
        _BankNumber: string,
        _Age: number,
        _Birthday: Date,
        _Address: string,
        _Nationality: string,
        _Phone: string,
        _Email: string,
        _Image: string,

        _TeamId: string,
        _TeamName: string,

        _RoleId: string,
        _RoleName: string,

        _DepartmentId: string,
        _DepartmentName: string,

        _OfficeId: string,
        _OfficeName: string,

        _CompanyId: string
    ) {
        this.employeeId = _EmployeeId;
        this.employeeName = _EmployeeName;
        this.sex = _Sex;
        this.bankName = _BankName;
        this.age = _Age;
        this.bankNumber = _BankNumber;
        this.changeDatePos = _ChaneDatePos;
        this.changeDateLoc = _ChaneDateLoc;
        this.joinDate = _JoinDate;
        this.birthday = _Birthday;
        this.address = _Address;
        this.nationality = _Nationality;
        this.phone = _Phone;
        this.email = _Email;
        this.image = _Image;

        this.teamId = _TeamId;
        this.teamName = _TeamName;

        this.roleId = _RoleId;
        this.roleName = _RoleName;

        this.departmentId = _DepartmentId;
        this.departmentName = _DepartmentName;

        this.officeId = _OfficeId;
        this.officeName = _OfficeName;

        this.companyId = _CompanyId;
    }
}
