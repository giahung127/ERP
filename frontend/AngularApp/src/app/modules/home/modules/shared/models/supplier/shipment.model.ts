export class Supplier {
    supplierId: string;
    name: string;
    address: Date;
    phone: string;
    email: string;
    code?: string

    constructor(
        supplierId: string,
        name: string,
        address: Date,
        phone: string,
        email: string
    ) {
        this.supplierId = supplierId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
