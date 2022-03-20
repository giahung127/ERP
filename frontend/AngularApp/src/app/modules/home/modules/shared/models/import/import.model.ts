export class Import {
    importId: string;
    createdDate: string;
    supplier: string;
    status: string;

    constructor(
        importId: string,
        createdDate: string,
        supplier: string,
        status: string
    ) {
        this.importId = importId;
        this.createdDate = createdDate;
        this.supplier = supplier;
        this.status = status;
    }
}
