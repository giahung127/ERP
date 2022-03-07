export class Customer {
    customerId: string;
    name: string;
    phone: string;
    address: string;
    dateOfBirth: string;

    constructor(
        customerId: string,
        name: string,
        phone: string,
        address: string,
        dateOfBirth: string
    ) {
        this.customerId = customerId;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
    }
}
