export class DepartmentList {
    id: string;
    Code: string;
    Name: string;
    Office: string;

    constructor(id: string, code: string, name: string, office: string) {
        this.id = id;
        this.Code = code;
        this.Name = name;
        this.Office = office;
    }
}
