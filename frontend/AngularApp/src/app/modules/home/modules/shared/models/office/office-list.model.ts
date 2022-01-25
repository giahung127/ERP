export class OfficeList {
    id: string;
    Code: string;
    Name: string;
    Location: string;
    Email: string;
    Phone: string;

    constructor(id: string, code: string, name: string, location: string, email: string, phone: string) {
        this.id = id;
        this.Name = name;
        this.Code = code;
        this.Location = location;
        this.Email = email;
        this.Phone = phone;
    }
}
