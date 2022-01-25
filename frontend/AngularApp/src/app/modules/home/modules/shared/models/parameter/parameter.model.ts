export class Parameter {
    officeId: string;
    code: string;
    description: string;
    value: any;

    constructor(officeId: string, code: string, description: string, value: any) {
        this.officeId = officeId;
        this.code = code;
        this.description = description;
        this.value = value;
    }
}
