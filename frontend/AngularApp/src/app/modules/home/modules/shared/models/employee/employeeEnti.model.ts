export class EmployeeEnti {
    employeeId: string;
    name?: string;
    sex?: boolean;
    startTime?: Date;

    changeDatePosition?: Date;
    changeDateLocation?: Date;

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

    positionId?: string;

    departmentId?: string;

    officeId?: string;

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

        _RoleId: string,

        _DepartmentId: string,

        _OfficeId: string,

        _CompanyId: string
    ) {
        this.employeeId = _EmployeeId;
        this.name = _EmployeeName;
        this.sex = _Sex;
        this.bankName = _BankName;
        this.age = _Age;
        this.bankNumber = _BankNumber;
        this.changeDatePosition = _ChaneDatePos;
        this.changeDateLocation = _ChaneDateLoc;
        this.startTime = _JoinDate;
        this.birthday = _Birthday;
        this.address = _Address;
        this.nationality = _Nationality;
        this.phone = _Phone;
        this.email = _Email;
        this.image = _Image;

        this.teamId = _TeamId;

        this.positionId = _RoleId;

        this.departmentId = _DepartmentId;

        this.officeId = _OfficeId;

        this.companyId = _CompanyId;
    }
}
