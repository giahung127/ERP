export class TeamList {
    id: string;
    Code: string;
    Name: string;
    Department: string;
    Office: string;

    constructor(id: string, code: string, name: string, department: string, office: string) {
        this.id = id;
        this.Code = code;
        this.Name = name;
        this.Department = department;
        this.Office = office;
    }
}
