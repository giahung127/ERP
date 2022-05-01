export class Company {
    id: string;
    name: string;
    address: string;
    contactName: string;
    contactMail: string;
    contactPhone: string;
    contactAddress: string;

    constructor(
        id: string,
        name: string,
        address: string,
        contactName: string,
        contactMail: string,
        contactPhone: string,
        contactAddress: string
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contactName = contactName;
        this.contactMail = contactMail;
        this.contactPhone = contactPhone;
        this.contactAddress = contactAddress;
    }
}
