export class Import {
    importId: string;
    importCode: string;
    createdBy: string;
    createdDate: string;
    supplierId: string;
    supplierName?: string;
    total: number;
    constructor(
        importId: string,
        importCode: string,
        createdBy: string,
        createdDate: string,
        supplierId: string,
        total: number
    ) {
        this.importId = importId;
        this.createdDate = createdDate;
        this.importCode = importCode;
        this.createdBy = createdBy;
        this.supplierId = supplierId;
        this.total = total;
    }
}
